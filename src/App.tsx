import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import VideoPlayer from './pages/VideoPlayer'
import Browse from './pages/Browse'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/watch/:id" element={<VideoPlayer />} />
        </Routes>
      </motion.main>
    </div>
  )
}

export default App
