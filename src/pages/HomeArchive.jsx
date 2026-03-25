import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useWisdom } from '../hooks/useWisdom'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import LoadingDots from '../components/LoadingDots'

const HomeArchive = () => {
    const { posts, loading, loadingMore, hasMore, loadMore } = useWisdom();

    if (loading) return <div className="flex items-center justify-center min-h-[60vh] font-display italic text-text-muted">Awakening archives...</div>;

    const featuredPost = posts.find(p => p.featured);
    const archivePosts = posts.filter(p => !p.featured);

    const isHindi = (text) => /[ \u0900-\u097F]/.test(text);

    return (
        <main className="w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-[120px] pb-32 pt-10">
            <Helmet>
                <title>Vrindopnishad — Home Archive</title>
            </Helmet>

            {/* Featured Marquee */}
            {featuredPost && (
                <section className="mb-32 cursor-pointer group">
                    <Link to={`/post/${featuredPost.slug}`} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-8 h-[400px] lg:h-[600px] w-full overflow-hidden rounded-[32px] order-2 lg:order-1 relative">
                            <img 
                                alt={featuredPost.title} 
                                className="w-full h-full object-cover grayscale-img transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-in-out" 
                                src={featuredPost.image} 
                            />
                        </div>
                        <div className="lg:col-span-4 flex flex-col justify-center order-1 lg:order-2 pl-0 lg:pl-4 transition-all duration-500">
                            <p className="text-zinc-500 dark:text-white/50 text-[13px] font-medium tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-zinc-400 dark:bg-white/20 transition-all group-hover:w-12 group-hover:bg-black dark:group-hover:bg-white"></span>
                                {featuredPost.date} · {featuredPost.topic}
                            </p>
                            <h1 className={`text-5xl md:text-[64px] font-normal leading-[1.1] text-zinc-900 dark:text-white mb-8 title-hover-italic transition-all duration-700 ${isHindi(featuredPost.title) ? 'font-hindi' : 'font-display'}`}>
                                {featuredPost.title}
                            </h1>
                            <p className={`text-zinc-600 dark:text-white/60 text-lg leading-[1.8] mb-8 line-clamp-3 ${isHindi(featuredPost.excerpt) ? 'font-hindi' : 'font-light'}`}>
                                {featuredPost.excerpt}
                            </p>
                            <div className="flex items-center gap-3 text-sm font-medium text-zinc-900 dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors">
                                <span className="tracking-[2px] uppercase">Begin Journey</span>
                                <span className="material-symbols-outlined text-sm transform group-hover:translate-x-2 transition-transform">arrow_forward</span>
                            </div>
                        </div>
                    </Link>
                </section>
            )}

            {/* Archive Grid Section */}
            <section className="mb-section px-4 md:px-0">
                <div className="flex items-center justify-between mb-16">
                    <h2 className="text-2xl font-normal italic text-zinc-900 dark:text-white font-display">The Archive</h2>
                    <span className="text-xs uppercase tracking-[0.2em] text-zinc-400 dark:text-white/40">Chronological</span>
                </div>

                {/* 2-Column Floating Masonry */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24 items-start">
                    {archivePosts.map((post, idx) => {
                        const aspectRatios = ['aspect-[4/3]', 'aspect-[3/4]', 'aspect-square', 'aspect-[16/9]'];
                        const aspectRatio = aspectRatios[idx % aspectRatios.length];
                        const isEvenColumn = idx % 2 === 1;
                        
                        return (
                            <Link 
                                key={post.id} 
                                to={`/post/${post.slug}`}
                                className={`group flex flex-col gap-8 transform transition-all duration-700 hover:-translate-y-2 ${isEvenColumn ? 'md:mt-24' : ''}`}
                            >
                                <div className={`w-full ${aspectRatio} overflow-hidden rounded-[32px] bg-zinc-100 dark:bg-white/5 relative`}>
                                    <img 
                                        src={post.image} 
                                        alt={post.title} 
                                        className="w-full h-full object-cover grayscale-img transform group-hover:scale-105 transition-transform duration-1000" 
                                    />
                                </div>
                                <div className="flex flex-col gap-4">
                                    <p className="text-zinc-400 dark:text-white/40 text-[11px] font-medium tracking-[3px] uppercase">
                                        [{post.date}] · [{post.topic}]
                                    </p>
                                    <h3 className={`text-3xl md:text-4xl font-normal leading-tight text-zinc-900 dark:text-white group-hover:text-black dark:group-hover:text-white title-hover-italic transition-all duration-500 ${isHindi(post.title) ? 'font-hindi' : 'font-display'}`}>
                                        {post.title}
                                    </h3>
                                    {post.excerpt && (
                                        <p className={`text-zinc-600 dark:text-white/50 text-base leading-relaxed line-clamp-2 max-w-[90%] ${isHindi(post.excerpt) ? 'font-hindi' : 'font-light'}`}>
                                            {post.excerpt}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {/* Infinite Scroll Trigger & Animation */}
                <div className="flex flex-col items-center justify-center py-24 md:py-32">
                    {loadingMore ? (
                        <LoadingDots />
                    ) : hasMore ? (
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={loadMore}
                            className="group relative flex items-center gap-4 px-10 py-5 rounded-full border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-white transition-all duration-500 hover:border-zinc-950 dark:hover:border-white hover:bg-zinc-950 dark:hover:bg-white hover:text-white dark:hover:text-black overflow-hidden"
                        >
                            <span className="text-[11px] uppercase tracking-[4px] font-medium relative z-10 italic">
                                Load More Wisdom
                            </span>
                            <span className="material-symbols-outlined text-sm relative z-10 transition-transform group-hover:translate-x-1">arrow_forward</span>
                        </motion.button>
                    ) : (
                        <div className="flex flex-col items-center gap-4 py-12">
                            <div className="w-12 h-[1px] bg-zinc-200 dark:bg-white/10"></div>
                            <p className="text-zinc-400 dark:text-white/20 text-[10px] uppercase tracking-[4px] font-medium italic">
                                Reflection reached the void
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    )
}

export default HomeArchive
