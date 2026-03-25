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

                    <div className="relative z-10 w-full flex justify-end p-6 md:p-12">
                        <button 
                            onClick={onClose} 
                            className="group flex h-12 w-12 items-center justify-center transition-all duration-500"
                        >
                            <span className="material-symbols-outlined text-zinc-500 dark:text-white/40 group-hover:text-zinc-950 dark:group-hover:text-white text-4xl transform group-hover:rotate-90 transition-all duration-500">close</span>
                        </button>
                    </div>
                    
                    <div className="relative z-10 w-full max-w-[1000px] mx-auto px-6 md:px-12 flex-1 flex flex-col pt-4 md:pt-12">
                        <motion.div 
                            initial={{ translateY: 20, opacity: 0 }}
                            animate={{ translateY: 0, opacity: 1 }}
                            className="relative w-full mb-12"
                        >
                            <input 
                                autoFocus
                                type="text" 
                                placeholder="What do you seek?" 
                                className="w-full bg-transparent border-none py-8 pr-16 text-4xl md:text-6xl lg:text-[100px] font-normal text-zinc-950 dark:text-white outline-none focus:ring-0 placeholder:italic placeholder:text-zinc-500 dark:placeholder:text-white/20 font-display leading-tight"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <div className="absolute right-0 bottom-1/2 translate-y-1/2 text-zinc-400 dark:text-white/20">
                                <span className="material-symbols-outlined text-4xl md:text-6xl font-light">search</span>
                            </div>
                            <div className="w-full h-[1px] bg-zinc-300 dark:bg-white/10 mt-2"></div>
                        </motion.div>

                        <div className="mb-12 h-6">
                            {query.length > 0 && query.length <= 2 && (
                                <p className="text-zinc-500 dark:text-white/40 text-[11px] uppercase tracking-[3px] font-medium italic animate-pulse">Scanning the void...</p>
                            )}
                        </div>
                        
                        <div className="flex-1 overflow-y-auto pb-20 no-scrollbar">
                            <div className="flex flex-col gap-12">
                                {results.map((post, idx) => (
                                    <motion.div
                                        key={post.id}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: idx * 0.05 }}
                                    >
                                        <Link 
                                            to={`/post/${post.slug}`} 
                                            onClick={onClose}
                                            className="group block"
                                        >
                                            <span className="block text-zinc-500 dark:text-white/30 text-[11px] uppercase tracking-[4px] font-medium mb-4 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">[{post.topic}]</span>
                                            <h3 className={`text-3xl md:text-5xl lg:text-6xl font-normal text-zinc-950 dark:text-white transition-all duration-500 group-hover:text-black dark:group-hover:text-white group-hover:italic ${post.title.match(/[\u0900-\u097F]/) ? 'font-hindi' : 'font-display'}`}>
                                                {post.title}
                                            </h3>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                            {query.length > 2 && results.length === 0 && (
                                <div className="py-20 text-center">
                                    <p className="text-zinc-500 dark:text-white/30 text-2xl font-display italic">The silence remains absolute.</p>
                                    <p className="text-zinc-400 dark:text-white/20 text-sm mt-4 uppercase tracking-[2px]">No records found</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Keyboard Hint */}
                    <div className="hidden md:flex absolute bottom-8 right-12 items-center space-x-4 text-zinc-500 dark:text-white/30">
                        <span className="text-[10px] uppercase tracking-[2px] font-medium">Esc to close</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default SearchOverlay
