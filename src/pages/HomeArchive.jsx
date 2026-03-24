import React from 'react'
import { Link } from 'react-router-dom'
import { useWisdom } from '../hooks/useWisdom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

const HomeArchive = () => {
    const { posts, loading } = useWisdom();

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
                            <p className="text-primary text-[13px] font-medium tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-primary transition-all group-hover:w-12"></span>
                                {featuredPost.date} · {featuredPost.topic}
                            </p>
                            <h1 className={`text-5xl md:text-[64px] font-normal leading-[1.1] text-zinc-900 dark:text-white mb-8 title-hover-italic transition-all duration-700 ${isHindi(featuredPost.title) ? 'font-hindi' : 'font-display'}`}>
                                {featuredPost.title}
                            </h1>
                            <p className={`text-zinc-600 dark:text-white/60 text-lg leading-[1.8] mb-8 line-clamp-3 ${isHindi(featuredPost.excerpt) ? 'font-hindi' : 'font-light'}`}>
                                {featuredPost.excerpt}
                            </p>
                            <div className="flex items-center gap-3 text-sm font-medium text-zinc-900 dark:text-white group-hover:text-primary transition-colors">
                                <span className="tracking-[2px] uppercase">Begin Journey</span>
                                <span className="material-symbols-outlined text-sm transform group-hover:translate-x-2 transition-transform">arrow_forward</span>
                            </div>
                        </div>
                    </Link>
                </section>
            )}

            {/* Divider */}
            <div className="w-full h-[1px] bg-zinc-200 dark:bg-white/10 mb-24 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#FAFAFA] dark:bg-[#0A0A0A] px-6 text-zinc-400 dark:text-white/40 text-[11px] tracking-[4px] uppercase transition-colors duration-500 font-display">
                    The Archive
                </div>
            </div>

            {/* Masonry Archive Grid */}
            <section className="masonry-grid" style={{ columnCount: 2, columnGap: '4rem' }}>
                {archivePosts.map((post, idx) => {
                    const aspectRatios = ['aspect-[4/3]', 'aspect-[3/4]', 'aspect-square', 'aspect-[16/9]'];
                    const aspectRatio = aspectRatios[idx % aspectRatios.length];
                    
                    return (
                        <article key={idx} className="masonry-item group cursor-pointer bg-white dark:bg-white/5 p-8 rounded-3xl border border-zinc-200 dark:border-white/10 hover:border-primary transition-all duration-500 mb-16 break-inside-avoid">
                            <Link to={`/post/${post.slug}`}>
                                <div className={`w-full ${aspectRatio} overflow-hidden rounded-[32px] mb-8 relative`}>
                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover grayscale-img transform group-hover:scale-105 transition-transform duration-1000" />
                                </div>
                                <div className="flex flex-col gap-4 px-2">
                                    <p className="text-zinc-400 dark:text-white/40 text-[11px] font-medium tracking-[2px] uppercase">
                                        {post.date} · {post.topic}
                                    </p>
                                    <h3 className={`text-3xl font-normal leading-[1.2] text-zinc-900 dark:text-white title-hover-italic transition-all duration-500 ${isHindi(post.title) ? 'font-hindi' : 'font-display'}`}>
                                        {post.title}
                                    </h3>
                                    <p className={`text-zinc-600 dark:text-white/60 text-base leading-relaxed mt-2 line-clamp-2 ${isHindi(post.excerpt) ? 'font-hindi' : ''}`}>
                                        {post.excerpt}
                                    </p>
                                </div>
                            </Link>
                        </article>
                    );
                })}
            </section>

            {/* Load More Emulator */}
            <div className="mt-24 flex justify-center">
                <button className="w-16 h-16 rounded-full border border-zinc-200 dark:border-white/10 flex items-center justify-center text-zinc-900 dark:text-white hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group">
                    <span className="material-symbols-outlined text-2xl group-hover:animate-bounce">arrow_downward</span>
                </button>
            </div>
        </main>
    )
}

export default HomeArchive
