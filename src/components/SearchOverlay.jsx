import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useWisdom } from '../hooks/useWisdom'

const SearchOverlay = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const { posts } = useWisdom();

    const results = query.length > 2 
        ? posts.filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
        : [];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-[#FAFAFA]/98 dark:bg-[#0A0A0A]/95 backdrop-blur-xl z-[2000] flex flex-col transition-all duration-500"
                >
                    {/* Background architectural image at low opacity */}
                    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.03] dark:opacity-[0.1]">
                        <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDj8Lrd-EE77bcIpic4-rDCUxwJvI8aaLy-oWMj3rhqwHtyB5XGLa-fVoJ3OtAKuMpF0PGrK5_1_PBy1BOr2pvFPrCzNeINlgJRiOnCS0gBzWZkGoF8wX3oFtkol1GZb2kNibRrBe_8YLeho3I9-Mn2fdtEururj_CBuM328mHjGlkY398eLK4nyNExLhF7dCaojclJsrARqlqZMlJw-1Hixm7tjkYSx75vWRBxeI31eqlMFbhBlrmqRxC1L-iZHZfp7-NX0eOO9lhh')" }}></div>
                    </div>

                    <div className="relative z-10 w-full flex justify-end p-8 md:p-12">
                        <button onClick={onClose} className="group flex h-12 w-12 items-center justify-center rounded-full bg-transparent hover:bg-zinc-900 dark:hover:bg-white transition-colors duration-300">
                            <span className="material-symbols-outlined text-zinc-900 dark:text-white group-hover:text-white dark:group-hover:text-zinc-900 text-3xl transition-colors">close</span>
                        </button>
                    </div>
                    
                    <div className="relative z-10 w-full max-w-[1000px] mx-auto px-8 flex-1 flex flex-col pt-10 md:pt-20">
                        <motion.div 
                            initial={{ translateY: -20, opacity: 0 }}
                            animate={{ translateY: 0, opacity: 1 }}
                            className="relative w-full mb-8 border-b border-zinc-200 dark:border-white/10"
                        >
                            <input 
                                autoFocus
                                type="text" 
                                placeholder="What do you seek?" 
                                className="w-full bg-transparent border-none py-10 text-4xl md:text-5xl lg:text-7xl font-normal text-zinc-900 dark:text-white outline-none focus:ring-0 placeholder:italic placeholder:opacity-30"
                                style={{ fontFamily: "'EB Garamond', serif" }}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <div className="absolute right-0 bottom-10 text-zinc-400 dark:text-white/40">
                                <span className="material-symbols-outlined text-4xl">search</span>
                            </div>
                        </motion.div>

                        <div className="mb-12 h-6">
                            {query.length > 0 && query.length <= 2 && (
                                <p className="text-zinc-400 dark:text-white/40 text-[13px] uppercase tracking-[2px] font-medium animate-pulse">Seeking...</p>
                            )}
                        </div>
                        
                        <div className="flex-1 overflow-y-auto pb-20 no-scrollbar pr-4">
                            {results.map((post, idx) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="mb-10 group"
                                >
                                    <Link 
                                        to={`/post/${post.slug}`} 
                                        onClick={onClose}
                                        className="block group"
                                    >
                                        <span className="block text-zinc-400 dark:text-white/40 text-[11px] uppercase tracking-[3px] font-bold mb-2 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">{post.topic}</span>
                                        <h3 className="text-3xl md:text-4xl font-normal text-zinc-900 dark:text-white group-hover:italic group-hover:text-black dark:group-hover:text-white transition-all duration-300" style={{ fontFamily: "'EB Garamond', serif" }}>
                                            {post.title}
                                        </h3>
                                    </Link>
                                </motion.div>
                            ))}
                            {query.length > 2 && results.length === 0 && (
                                <p className="text-zinc-400 dark:text-white/30 text-xl font-serif italic text-center py-20">The archive remains silent on this inquiry.</p>
                            )}
                        </div>
                    </div>

                    {/* Keyboard Hint */}
                    <div className="hidden md:flex absolute bottom-8 right-12 items-center space-x-2 text-zinc-400 dark:text-white/40">
                        <span className="text-[11px] uppercase tracking-[1px] font-medium">Press</span>
                        <kbd className="px-2 py-1 bg-zinc-100 dark:bg-white/10 rounded text-[10px] text-zinc-900 dark:text-white border border-zinc-200 dark:border-white/20 shadow-sm">Esc</kbd>
                        <span className="text-[11px] uppercase tracking-[1px] font-medium">to close</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default SearchOverlay
