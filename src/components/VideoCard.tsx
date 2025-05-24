import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Play, Clock, Eye } from 'lucide-react'

interface Video {
  id: string
  title: string
  thumbnail: string
  duration: string
  views: number
  uploadDate: string
  description: string
}

interface VideoCardProps {
  video: Video
  index: number
}

const VideoCard = ({ video, index }: VideoCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="video-card group cursor-pointer"
    >
      <Link to={`/watch/${video.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
            <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors duration-200 line-clamp-2">
            {video.title}
          </h3>
          
          <div className="flex items-center justify-between mt-2 text-sm text-gray-400">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Eye className="h-3 w-3" />
                <span>{video.views.toLocaleString()} vues</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{video.uploadDate}</span>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">
            {video.description}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

export default VideoCard
