import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import VideoCard from '../components/VideoCard'
import { Search, Filter, Grid, List, SortAsc } from 'lucide-react'

// Données d'exemple étendues
const allVideos = [
  {
    id: '1',
    title: 'Introduction au Streaming Moderne',
    thumbnail: 'https://via.placeholder.com/400x225/3b82f6/ffffff?text=Video+1',
    duration: '15:42',
    views: 1250000,
    uploadDate: 'il y a 2 jours',
    description: 'Découvrez les dernières technologies de streaming vidéo et comment elles révolutionnent notre façon de consommer du contenu.',
    category: 'Technologie',
    tags: ['streaming', 'tech', 'moderne']
  },
  {
    id: '2',
    title: 'Les Secrets du Développement Web',
    thumbnail: 'https://via.placeholder.com/400x225/10b981/ffffff?text=Video+2',
    duration: '23:15',
    views: 890000,
    uploadDate: 'il y a 1 semaine',
    description: 'Un guide complet pour maîtriser les frameworks modernes et créer des applications web performantes.',
    category: 'Développement',
    tags: ['web', 'développement', 'frameworks']
  },
  {
    id: '3',
    title: 'Design UI/UX : Tendances 2025',
    thumbnail: 'https://via.placeholder.com/400x225/f59e0b/ffffff?text=Video+3',
    duration: '18:30',
    views: 2100000,
    uploadDate: 'il y a 3 jours',
    description: 'Explorez les nouvelles tendances du design interface utilisateur et expérience utilisateur pour cette année.',
    category: 'Design',
    tags: ['design', 'ui', 'ux', 'tendances']
  },
  {
    id: '4',
    title: 'React vs Vue vs Angular : Comparatif',
    thumbnail: 'https://via.placeholder.com/400x225/ef4444/ffffff?text=Video+4',
    duration: '31:20',
    views: 1800000,
    uploadDate: 'il y a 5 jours',
    description: 'Une analyse détaillée des frameworks JavaScript les plus populaires pour vous aider à faire le bon choix.',
    category: 'Développement',
    tags: ['react', 'vue', 'angular', 'comparatif']
  },
  {
    id: '5',
    title: 'Cybersécurité : Protégez vos Applications',
    thumbnail: 'https://via.placeholder.com/400x225/8b5cf6/ffffff?text=Video+5',
    duration: '27:45',
    views: 950000,
    uploadDate: 'il y a 1 semaine',
    description: 'Apprenez les meilleures pratiques pour sécuriser vos applications web contre les menaces modernes.',
    category: 'Sécurité',
    tags: ['cybersécurité', 'sécurité', 'protection']
  },
  {
    id: '6',
    title: 'Intelligence Artificielle et Développement',
    thumbnail: 'https://via.placeholder.com/400x225/06b6d4/ffffff?text=Video+6',
    duration: '45:12',
    views: 3200000,
    uploadDate: 'il y a 2 semaines',
    description: 'Comment l\'IA transforme le développement logiciel et quels outils utiliser pour être plus productif.',
    category: 'IA',
    tags: ['ia', 'intelligence artificielle', 'développement']
  },
  {
    id: '7',
    title: 'Déploiement avec Docker et Kubernetes',
    thumbnail: 'https://via.placeholder.com/400x225/ec4899/ffffff?text=Video+7',
    duration: '38:22',
    views: 750000,
    uploadDate: 'il y a 4 jours',
    description: 'Maîtrisez les conteneurs et l\'orchestration pour déployer vos applications en production.',
    category: 'DevOps',
    tags: ['docker', 'kubernetes', 'déploiement']
  },
  {
    id: '8',
    title: 'Base de Données NoSQL vs SQL',
    thumbnail: 'https://via.placeholder.com/400x225/84cc16/ffffff?text=Video+8',
    duration: '22:18',
    views: 650000,
    uploadDate: 'il y a 6 jours',
    description: 'Comprenez les différences entre bases de données relationnelles et non-relationnelles.',
    category: 'Base de données',
    tags: ['database', 'nosql', 'sql']
  }
]

const categories = ['Toutes', 'Technologie', 'Développement', 'Design', 'Sécurité', 'IA', 'DevOps', 'Base de données']
const sortOptions = ['Plus récent', 'Plus populaire', 'Durée croissante', 'Durée décroissante']

const Browse = () => {
  const [videos] = useState(allVideos)
  const [filteredVideos, setFilteredVideos] = useState(allVideos)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Toutes')
  const [sortBy, setSortBy] = useState('Plus récent')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    let filtered = videos

    // Filtrage par recherche
    if (searchQuery) {
      filtered = filtered.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Filtrage par catégorie
    if (selectedCategory !== 'Toutes') {
      filtered = filtered.filter(video => video.category === selectedCategory)
    }

    // Tri
    switch (sortBy) {
      case 'Plus récent':
        filtered.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
        break
      case 'Plus populaire':
        filtered.sort((a, b) => b.views - a.views)
        break
      case 'Durée croissante':
        filtered.sort((a, b) => {
          const aDuration = a.duration.split(':').reduce((acc, time) => (60 * acc) + +time, 0)
          const bDuration = b.duration.split(':').reduce((acc, time) => (60 * acc) + +time, 0)
          return aDuration - bDuration
        })
        break
      case 'Durée décroissante':
        filtered.sort((a, b) => {
          const aDuration = a.duration.split(':').reduce((acc, time) => (60 * acc) + +time, 0)
          const bDuration = b.duration.split(':').reduce((acc, time) => (60 * acc) + +time, 0)
          return bDuration - aDuration
        })
        break
    }

    setFilteredVideos(filtered)
  }, [videos, searchQuery, selectedCategory, sortBy])

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Parcourir les vidéos</h1>
          <p className="text-gray-400 text-lg">Découvrez notre collection complète de contenus</p>
        </motion.div>

        {/* Barre de recherche et contrôles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Barre de recherche principale */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher des vidéos, catégories, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark-800 text-white pl-12 pr-4 py-4 rounded-lg border border-dark-600 focus:border-primary-500 focus:outline-none text-lg"
            />
          </div>

          {/* Contrôles de filtrage et d'affichage */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 btn-secondary"
              >
                <Filter className="h-4 w-4" />
                <span>Filtres</span>
              </button>

              <div className="flex items-center space-x-2">
                <SortAsc className="h-4 w-4 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-dark-800 text-white border border-dark-600 rounded-lg px-3 py-2 focus:border-primary-500 focus:outline-none"
                >
                  {sortOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-dark-800 text-gray-400 hover:text-white'}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-dark-800 text-gray-400 hover:text-white'}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Filtres de catégories */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-dark-800 rounded-lg p-4 border border-dark-600"
            >
              <h3 className="text-white font-semibold mb-3">Catégories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary-600 text-white'
                        : 'bg-dark-700 text-gray-300 hover:bg-dark-600 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Résultats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-400">
              {filteredVideos.length} vidéo{filteredVideos.length > 1 ? 's' : ''} trouvée{filteredVideos.length > 1 ? 's' : ''}
            </p>
          </div>

          {filteredVideos.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-4">Aucune vidéo trouvée</div>
              <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'video-grid' : 'space-y-4'}>
              {filteredVideos.map((video, index) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  index={index}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Browse
