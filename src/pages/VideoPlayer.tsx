import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import CustomVideoPlayer from '../components/CustomVideoPlayer'
import VideoCard from '../components/VideoCard'
import { 
  ArrowLeft, 
  Share2, 
  Download, 
  Heart, 
  MessageCircle, 
  Eye,
  Calendar,
  Tag
} from 'lucide-react'

// Données d'exemple pour la vidéo et les recommandations
const mockVideoData = {
  '1': {
    id: '1',
    title: 'Introduction au Streaming Moderne',
    description: 'Découvrez les dernières technologies de streaming vidéo et comment elles révolutionnent notre façon de consommer du contenu. Dans cette vidéo complète, nous explorons les protocoles de streaming, les formats vidéo optimisés, et les meilleures pratiques pour une expérience utilisateur exceptionnelle.',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnail: 'https://via.placeholder.com/1280x720/3b82f6/ffffff?text=Video+Player',
    duration: '15:42',
    views: 1250000,
    likes: 45000,
    uploadDate: 'il y a 2 jours',
    category: 'Technologie',
    tags: ['streaming', 'tech', 'moderne', 'vidéo'],
    author: {
      name: 'Tech Monika',
      avatar: 'https://via.placeholder.com/48x48/10b981/ffffff?text=TM',
      subscribers: 125000
    }
  },
  // Ajouter d'autres vidéos...
}

const relatedVideos = [
  {
    id: '2',
    title: 'Les Secrets du Développement Web',
    thumbnail: 'https://via.placeholder.com/400x225/10b981/ffffff?text=Video+2',
    duration: '23:15',
    views: 890000,
    uploadDate: 'il y a 1 semaine',
    description: 'Un guide complet pour maîtriser les frameworks modernes.'
  },
  {
    id: '3',
    title: 'Design UI/UX : Tendances 2025',
    thumbnail: 'https://via.placeholder.com/400x225/f59e0b/ffffff?text=Video+3',
    duration: '18:30',
    views: 2100000,
    uploadDate: 'il y a 3 jours',
    description: 'Explorez les nouvelles tendances du design.'
  },
  {
    id: '4',
    title: 'React vs Vue vs Angular : Comparatif',
    thumbnail: 'https://via.placeholder.com/400x225/ef4444/ffffff?text=Video+4',
    duration: '31:20',
    views: 1800000,
    uploadDate: 'il y a 5 jours',
    description: 'Une analyse détaillée des frameworks JavaScript.'
  }
]

const VideoPlayer = () => {  const { id } = useParams<{ id: string }>()
  const [video, setVideo] = useState<any>(null)
  const [isLiked, setIsLiked] = useState(false)
  const [showDescription, setShowDescription] = useState(false)
  const [comments] = useState([
    {
      id: 1,
      author: 'Alice Dupont',
      avatar: 'https://via.placeholder.com/32x32/3b82f6/ffffff?text=AD',
      content: 'Excellente vidéo ! Très instructive et bien expliquée.',
      timestamp: 'il y a 2 heures',
      likes: 24
    },
    {
      id: 2,
      author: 'Marc Martin',
      avatar: 'https://via.placeholder.com/32x32/10b981/ffffff?text=MM',
      content: 'Merci pour ce contenu de qualité. J\'ai appris beaucoup de choses.',
      timestamp: 'il y a 5 heures',
      likes: 12
    },
    {
      id: 3,
      author: 'Sophie Bernard',
      avatar: 'https://via.placeholder.com/32x32/f59e0b/ffffff?text=SB',
      content: 'Pouvez-vous faire une suite sur les techniques avancées ?',
      timestamp: 'il y a 1 jour',
      likes: 8
    }
  ])

  useEffect(() => {
    // Simulation d'un appel API pour récupérer les données de la vidéo
    if (id && mockVideoData[id as keyof typeof mockVideoData]) {
      setVideo(mockVideoData[id as keyof typeof mockVideoData])
    } else {
      // Vidéo par défaut si l'ID n'est pas trouvé
      setVideo({
        ...mockVideoData['1'],
        id: id || '1',
        title: `Vidéo ${id || '1'}`,
        src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
      })
    }
  }, [id])

  if (!video) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    )
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Bouton retour */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Retour à l'accueil</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lecteur vidéo principal */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <CustomVideoPlayer
                src={video.src}
                poster={video.thumbnail}
                title={video.title}
              />
            </motion.div>

            {/* Informations de la vidéo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-dark-800 rounded-lg p-6 mb-6"
            >
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {video.title}
              </h1>

              <div className="flex flex-wrap items-center justify-between mb-4">
                <div className="flex items-center space-x-6 text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{video.views.toLocaleString()} vues</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{video.uploadDate}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      isLiked
                        ? 'bg-red-600 text-white'
                        : 'bg-dark-700 text-gray-400 hover:text-white hover:bg-dark-600'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                    <span>{video.likes.toLocaleString()}</span>
                  </button>

                  <button className="flex items-center space-x-2 bg-dark-700 text-gray-400 hover:text-white hover:bg-dark-600 px-4 py-2 rounded-lg transition-colors">
                    <Share2 className="h-4 w-4" />
                    <span>Partager</span>
                  </button>

                  <button className="flex items-center space-x-2 bg-dark-700 text-gray-400 hover:text-white hover:bg-dark-600 px-4 py-2 rounded-lg transition-colors">
                    <Download className="h-4 w-4" />
                    <span>Télécharger</span>
                  </button>
                </div>
              </div>

              {/* Auteur */}
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={video.author.avatar}
                  alt={video.author.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="text-white font-semibold">{video.author.name}</div>
                  <div className="text-gray-400 text-sm">
                    {video.author.subscribers.toLocaleString()} abonnés
                  </div>
                </div>
                <button className="ml-auto btn-primary">
                  S'abonner
                </button>
              </div>

              {/* Description */}
              <div className="border-t border-dark-600 pt-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Tag className="h-4 w-4 text-gray-400" />
                  <div className="flex flex-wrap gap-2">
                    {video.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="bg-primary-900/30 text-primary-300 px-2 py-1 rounded text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="text-gray-300">
                  <p className={`${!showDescription ? 'line-clamp-3' : ''}`}>
                    {video.description}
                  </p>
                  <button
                    onClick={() => setShowDescription(!showDescription)}
                    className="text-primary-400 hover:text-primary-300 mt-2 text-sm"
                  >
                    {showDescription ? 'Voir moins' : 'Voir plus'}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Section commentaires */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-dark-800 rounded-lg p-6"
            >
              <div className="flex items-center space-x-2 mb-6">
                <MessageCircle className="h-5 w-5 text-primary-400" />
                <h3 className="text-xl font-semibold text-white">
                  Commentaires ({comments.length})
                </h3>
              </div>

              {/* Nouveau commentaire */}
              <div className="mb-6">
                <textarea
                  placeholder="Ajouter un commentaire..."
                  className="w-full bg-dark-700 text-white border border-dark-600 rounded-lg p-3 focus:border-primary-500 focus:outline-none resize-none"
                  rows={3}
                />
                <div className="flex justify-end mt-2">
                  <button className="btn-primary">
                    Publier
                  </button>
                </div>
              </div>

              {/* Liste des commentaires */}
              <div className="space-y-4">
                {comments.map(comment => (
                  <div key={comment.id} className="flex space-x-3">
                    <img
                      src={comment.avatar}
                      alt={comment.author}
                      className="w-8 h-8 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-white font-medium">{comment.author}</span>
                        <span className="text-gray-400 text-sm">{comment.timestamp}</span>
                      </div>
                      <p className="text-gray-300 mb-2">{comment.content}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <button className="text-gray-400 hover:text-white flex items-center space-x-1">
                          <Heart className="h-3 w-3" />
                          <span>{comment.likes}</span>
                        </button>
                        <button className="text-gray-400 hover:text-white">
                          Répondre
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar avec vidéos recommandées */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-xl font-semibold text-white mb-6">Vidéos recommandées</h3>
              <div className="space-y-4">
                {relatedVideos.map((relatedVideo, index) => (
                  <VideoCard
                    key={relatedVideo.id}
                    video={relatedVideo}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer
