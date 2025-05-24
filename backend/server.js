const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const compression = require('compression')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware de sécurité
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      mediaSrc: ["'self'", "data:", "blob:", "*"],
      imgSrc: ["'self'", "data:", "blob:", "*"],
    },
  },
}))

// Configuration CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://votre-domaine.com'] 
    : ['http://localhost:3000'],
  credentials: true
}))

// Limitation du taux de requêtes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite chaque IP à 100 requêtes par windowMs
  message: 'Trop de requêtes depuis cette IP, veuillez réessayer plus tard.'
})
app.use('/api/', limiter)

// Middleware de base
app.use(compression())
app.use(morgan('combined'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Données d'exemple (en production, utilisez une vraie base de données)
const videos = [
  {
    id: '1',
    title: 'Introduction au Streaming Moderne',
    description: 'Découvrez les dernières technologies de streaming vidéo et comment elles révolutionnent notre façon de consommer du contenu.',
    thumbnail: 'https://via.placeholder.com/400x225/3b82f6/ffffff?text=Video+1',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    duration: '15:42',
    views: 1250000,
    likes: 45000,
    uploadDate: new Date('2025-05-22'),
    category: 'Technologie',
    tags: ['streaming', 'tech', 'moderne'],
    author: {
      id: '1',
      name: 'Tech Monika',
      avatar: 'https://via.placeholder.com/48x48/10b981/ffffff?text=TM',
      subscribers: 125000
    }
  },
  {
    id: '2',
    title: 'Les Secrets du Développement Web',
    description: 'Un guide complet pour maîtriser les frameworks modernes et créer des applications web performantes.',
    thumbnail: 'https://via.placeholder.com/400x225/10b981/ffffff?text=Video+2',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    duration: '23:15',
    views: 890000,
    likes: 32000,
    uploadDate: new Date('2025-05-17'),
    category: 'Développement',
    tags: ['web', 'développement', 'frameworks'],
    author: {
      id: '2',
      name: 'Dev Master',
      avatar: 'https://via.placeholder.com/48x48/3b82f6/ffffff?text=DM',
      subscribers: 89000
    }
  },
  {
    id: '3',
    title: 'Design UI/UX : Tendances 2025',
    description: 'Explorez les nouvelles tendances du design interface utilisateur et expérience utilisateur pour cette année.',
    thumbnail: 'https://via.placeholder.com/400x225/f59e0b/ffffff?text=Video+3',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    duration: '18:30',
    views: 2100000,
    likes: 78000,
    uploadDate: new Date('2025-05-21'),
    category: 'Design',
    tags: ['design', 'ui', 'ux', 'tendances'],
    author: {
      id: '3',
      name: 'Design Guru',
      avatar: 'https://via.placeholder.com/48x48/f59e0b/ffffff?text=DG',
      subscribers: 156000
    }
  }
]

const categories = ['Technologie', 'Développement', 'Design', 'Sécurité', 'IA', 'DevOps']

// Routes API

// Route de santé
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

// Obtenir toutes les vidéos avec pagination et filtres
app.get('/api/videos', (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      search, 
      sortBy = 'uploadDate',
      order = 'desc' 
    } = req.query

    let filteredVideos = [...videos]

    // Filtrage par catégorie
    if (category && category !== 'Toutes') {
      filteredVideos = filteredVideos.filter(video => video.category === category)
    }

    // Recherche par titre, description ou tags
    if (search) {
      const searchLower = search.toLowerCase()
      filteredVideos = filteredVideos.filter(video =>
        video.title.toLowerCase().includes(searchLower) ||
        video.description.toLowerCase().includes(searchLower) ||
        video.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }

    // Tri
    filteredVideos.sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case 'views':
          comparison = a.views - b.views
          break
        case 'likes':
          comparison = a.likes - b.likes
          break
        case 'title':
          comparison = a.title.localeCompare(b.title)
          break
        case 'uploadDate':
        default:
          comparison = new Date(a.uploadDate) - new Date(b.uploadDate)
      }
      return order === 'desc' ? -comparison : comparison
    })

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const paginatedVideos = filteredVideos.slice(startIndex, endIndex)

    res.json({
      videos: paginatedVideos,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(filteredVideos.length / limit),
        totalVideos: filteredVideos.length,
        hasNext: endIndex < filteredVideos.length,
        hasPrev: startIndex > 0
      }
    })
  } catch (error) {
    console.error('Erreur lors de la récupération des vidéos:', error)
    res.status(500).json({ error: 'Erreur interne du serveur' })
  }
})

// Obtenir une vidéo spécifique
app.get('/api/videos/:id', (req, res) => {
  try {
    const { id } = req.params
    const video = videos.find(v => v.id === id)

    if (!video) {
      return res.status(404).json({ error: 'Vidéo non trouvée' })
    }

    // Incrémenter les vues (en production, ceci serait fait de manière plus sophistiquée)
    video.views += 1

    res.json(video)
  } catch (error) {
    console.error('Erreur lors de la récupération de la vidéo:', error)
    res.status(500).json({ error: 'Erreur interne du serveur' })
  }
})

// Obtenir les vidéos recommandées
app.get('/api/videos/:id/related', (req, res) => {
  try {
    const { id } = req.params
    const currentVideo = videos.find(v => v.id === id)

    if (!currentVideo) {
      return res.status(404).json({ error: 'Vidéo non trouvée' })
    }

    // Recommandations basées sur la catégorie et les tags
    let relatedVideos = videos
      .filter(v => v.id !== id)
      .filter(v => 
        v.category === currentVideo.category ||
        v.tags.some(tag => currentVideo.tags.includes(tag))
      )
      .sort((a, b) => b.views - a.views)
      .slice(0, 6)

    // Si pas assez de vidéos similaires, ajouter les plus populaires
    if (relatedVideos.length < 6) {
      const additionalVideos = videos
        .filter(v => v.id !== id && !relatedVideos.find(rv => rv.id === v.id))
        .sort((a, b) => b.views - a.views)
        .slice(0, 6 - relatedVideos.length)
      
      relatedVideos = [...relatedVideos, ...additionalVideos]
    }

    res.json(relatedVideos)
  } catch (error) {
    console.error('Erreur lors de la récupération des vidéos recommandées:', error)
    res.status(500).json({ error: 'Erreur interne du serveur' })
  }
})

// Obtenir les catégories
app.get('/api/categories', (req, res) => {
  try {
    res.json(categories)
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error)
    res.status(500).json({ error: 'Erreur interne du serveur' })
  }
})

// Recherche de vidéos
app.get('/api/search', (req, res) => {
  try {
    const { q, limit = 10 } = req.query

    if (!q) {
      return res.status(400).json({ error: 'Paramètre de recherche requis' })
    }

    const searchLower = q.toLowerCase()
    const searchResults = videos
      .filter(video =>
        video.title.toLowerCase().includes(searchLower) ||
        video.description.toLowerCase().includes(searchLower) ||
        video.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        video.author.name.toLowerCase().includes(searchLower)
      )
      .sort((a, b) => b.views - a.views)
      .slice(0, parseInt(limit))

    res.json({
      query: q,
      results: searchResults,
      total: searchResults.length
    })
  } catch (error) {
    console.error('Erreur lors de la recherche:', error)
    res.status(500).json({ error: 'Erreur interne du serveur' })
  }
})

// Statistiques globales
app.get('/api/stats', (req, res) => {
  try {
    const totalViews = videos.reduce((sum, video) => sum + video.views, 0)
    const totalLikes = videos.reduce((sum, video) => sum + video.likes, 0)
    const totalVideos = videos.length

    res.json({
      totalViews,
      totalLikes,
      totalVideos,
      categoriesCount: categories.length,
      averageViews: Math.round(totalViews / totalVideos),
      averageLikes: Math.round(totalLikes / totalVideos)
    })
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error)
    res.status(500).json({ error: 'Erreur interne du serveur' })
  }
})

// Gestion des erreurs 404
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint non trouvé' })
})

// Gestion des erreurs globales
app.use((error, req, res, next) => {
  console.error('Erreur non gérée:', error)
  res.status(500).json({ error: 'Erreur interne du serveur' })
})

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`)
  console.log(`📱 API disponible sur http://localhost:${PORT}/api`)
  console.log(`🏥 Santé du serveur: http://localhost:${PORT}/api/health`)
})

module.exports = app
