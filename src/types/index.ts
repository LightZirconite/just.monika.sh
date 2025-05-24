// Types pour les vidéos
export interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  videoUrl?: string
  duration: string
  views: number
  likes: number
  uploadDate: string
  category: string
  tags: string[]
  author: Author
}

// Types pour les auteurs
export interface Author {
  id: string
  name: string
  avatar: string
  subscribers: number
}

// Types pour la pagination
export interface Pagination {
  currentPage: number
  totalPages: number
  totalVideos: number
  hasNext: boolean
  hasPrev: boolean
}

// Types pour les réponses API
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface VideosResponse {
  videos: Video[]
  pagination: Pagination
}

export interface SearchResponse {
  query: string
  results: Video[]
  total: number
}

export interface StatsResponse {
  totalViews: number
  totalLikes: number
  totalVideos: number
  categoriesCount: number
  averageViews: number
  averageLikes: number
}

// Types pour les commentaires
export interface Comment {
  id: number
  author: string
  avatar: string
  content: string
  timestamp: string
  likes: number
  replies?: Comment[]
}

// Types pour les paramètres de recherche
export interface SearchParams {
  page?: number
  limit?: number
  category?: string
  search?: string
  sortBy?: 'uploadDate' | 'views' | 'likes' | 'title'
  order?: 'asc' | 'desc'
}

// Types pour le lecteur vidéo
export interface VideoPlayerState {
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isMuted: boolean
  isLoading: boolean
  isFullscreen: boolean
  showControls: boolean
}

// Types pour les props des composants
export interface VideoCardProps {
  video: Video
  index: number
  onClick?: (video: Video) => void
}

export interface VideoPlayerProps {
  src: string
  poster?: string
  title?: string
  autoPlay?: boolean
  onTimeUpdate?: (currentTime: number) => void
  onEnded?: () => void
}

export interface NavbarProps {
  onSearch?: (query: string) => void
}

// Types pour les hooks
export interface UseApiOptions {
  enabled?: boolean
  refetchOnWindowFocus?: boolean
  staleTime?: number
}

export interface UseVideoPlayer {
  videoRef: React.RefObject<HTMLVideoElement>
  state: VideoPlayerState
  actions: {
    play: () => void
    pause: () => void
    togglePlay: () => void
    seek: (time: number) => void
    setVolume: (volume: number) => void
    toggleMute: () => void
    toggleFullscreen: () => void
  }
}

// Types pour les erreurs
export interface ApiError {
  message: string
  status: number
  code?: string
}

// Types pour les filtres
export interface FilterOptions {
  categories: string[]
  sortOptions: string[]
  viewModes: ('grid' | 'list')[]
}

// Types pour les préférences utilisateur
export interface UserPreferences {
  theme: 'dark' | 'light'
  language: string
  autoPlay: boolean
  videoQuality: 'auto' | '1080p' | '720p' | '480p'
  volume: number
}
