import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import HomeArchive from './pages/HomeArchive'
import ReadingRoom from './pages/ReadingRoom'
import TopicSanctum from './pages/TopicSanctum'

import Navbar from './components/Navbar'
import SearchOverlay from './components/SearchOverlay'

function App() {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] flex flex-col text-zinc-900 dark:text-white transition-colors duration-500">
          <Navbar onSearchOpen={() => setIsSearchOpen(true)} />
          <Routes>
            <Route path="/" element={<HomeArchive />} />
            <Route path="/post/:slug" element={<ReadingRoom />} />
            <Route path="/topics/:category" element={<TopicSanctum />} />
            <Route path="/topics" element={<TopicSanctum />} />
          </Routes>
          <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
          <footer className="py-24 border-t border-zinc-200 dark:border-white/10 text-center text-zinc-500 dark:text-white/40 text-sm uppercase tracking-[0.1em]">
            &copy; 2026 Vrindopnishad — The Silence of Wisdom
          </footer>
        </div>
      </Router>
    </HelmetProvider>
  )
}

export default App
