import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import VideoCard from '../components/VideoCard'
import { Sparkles, TrendingUp, Clock } from 'lucide-react'

// Données d'exemple pour les vidéos
const mockVideos = [
  {
    id: '1',
    title: 'Introduction au Streaming Moderne',
    thumbnail: 'https://via.placeholder.com/400x225/3b82f6/ffffff?text=Video+1',
    duration: '15:42',
    views: 1250000,
    uploadDate: 'il y a 2 jours',
    description: 'Découvrez les dernières technologies de streaming vidéo et comment elles révolutionnent notre façon de consommer du contenu.'
  },
  {
    id: '2',
    title: 'Les Secrets du Développement Web',
    thumbnail: 'https://via.placeholder.com/400x225/10b981/ffffff?text=Video+2',
    duration: '23:15',
    views: 890000,
    uploadDate: 'il y a 1 semaine',
    description: 'Un guide complet pour maîtriser les frameworks modernes et créer des applications web performantes.'
  },
  {
    id: '3',
    title: 'Design UI/UX : Tendances 2025',
    thumbnail: 'https://via.placeholder.com/400x225/f59e0b/ffffff?text=Video+3',
    duration: '18:30',
    views: 2100000,
    uploadDate: 'il y a 3 jours',
    description: 'Explorez les nouvelles tendances du design interface utilisateur et expérience utilisateur pour cette année.'
  },
  {
    id: '4',
    title: 'React vs Vue vs Angular : Comparatif',
    thumbnail: 'https://via.placeholder.com/400x225/ef4444/ffffff?text=Video+4',
    duration: '31:20',
    views: 1800000,
    uploadDate: 'il y a 5 jours',
    description: 'Une analyse détaillée des frameworks JavaScript les plus populaires pour vous aider à faire le bon choix.'
  },
  {
    id: '5',
    title: 'Cybersécurité : Protégez vos Applications',
    thumbnail: 'https://via.placeholder.com/400x225/8b5cf6/ffffff?text=Video+5',
    duration: '27:45',
    views: 950000,
    uploadDate: 'il y a 1 semaine',
    description: 'Apprenez les meilleures pratiques pour sécuriser vos applications web contre les menaces modernes.'
  },
  {
    id: '6',
    title: 'Intelligence Artificielle et Développement',
    thumbnail: 'https://via.placeholder.com/400x225/06b6d4/ffffff?text=Video+6',
    duration: '45:12',
    views: 3200000,
    uploadDate: 'il y a 2 semaines',
    description: 'Comment l\'IA transforme le développement logiciel et quels outils utiliser pour être plus productif.'
  }
]

const Home = () => {
  const [featuredVideo] = useState(mockVideos[0])
  const [videos, setVideos] = useState(mockVideos)

  useEffect(() => {
    // Simulation d'un appel API
    const fetchVideos = async () => {
      // Ici, vous feriez un appel à votre API
      // const response = await fetch('/api/videos')
      // const data = await response.json()
      setVideos(mockVideos)
    }
    
    fetchVideos()
  }, [])

  const categories = [
    { name: 'Populaires', icon: TrendingUp, videos: videos.slice(0, 3) },
    { name: 'Récents', icon: Clock, videos: videos.slice(3, 6) },
    { name: 'Recommandés', icon: Sparkles, videos: videos.slice(1, 4) }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section avec vidéo en vedette */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-96 md:h-[500px] bg-gradient-to-r from-primary-900 via-primary-800 to-primary-700 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Bienvenue sur <span className="text-primary-400">Monika Streaming</span>
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-200 mb-8"
            >
              Découvrez une nouvelle façon de regarder vos vidéos préférées avec une expérience de streaming moderne et intuitive.
            </motion.p>
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button className="btn-primary text-lg px-8 py-4">
                Commencer à regarder
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                Parcourir le catalogue
              </button>
            </motion.div>
          </div>
        </div>
        
        {/* Image de fond décorative */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-20">
          <img
            src={featuredVideo.thumbnail}
            alt="Featured"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.section>

      {/* Sections de catégories */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {categories.map((category, categoryIndex) => {
          const Icon = category.icon
          return (
            <motion.section
              key={category.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.2 }}
              className="mb-12"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Icon className="h-6 w-6 text-primary-400" />
                <h2 className="text-2xl font-bold text-white">{category.name}</h2>
              </div>
              
              <div className="video-grid">
                {category.videos.map((video, index) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    index={index}
                  />
                ))}
              </div>
            </motion.section>
          )
        })}
      </div>

      {/* Section statistiques */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-dark-800 py-16"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Rejoignez notre communauté</h2>
            <p className="text-gray-400 text-lg">Des milliers d'utilisateurs nous font déjà confiance</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-400 mb-2">10M+</div>
              <div className="text-gray-300">Vues totales</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-400 mb-2">500K+</div>
              <div className="text-gray-300">Utilisateurs actifs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-400 mb-2">1000+</div>
              <div className="text-gray-300">Vidéos disponibles</div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default Home
