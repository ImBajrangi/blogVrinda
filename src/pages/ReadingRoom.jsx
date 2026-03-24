import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useWisdom } from '../hooks/useWisdom'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Helmet } from 'react-helmet-async'

const ReadingRoom = () => {
    const { slug } = useParams();
    const { getPostBySlug, loading, posts } = useWisdom();
    const post = getPostBySlug(slug);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (loading) return <div className="p-20 text-center font-display">Opening Wisdom...</div>;
    if (!post) return <div className="p-20 text-center font-display">Not Found.</div>;

    const nextPost = posts.find(p => p.slug !== post.slug);

    // Schema.org Structured Data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "image": post.image,
        "datePublished": post.created_at || new Date().toISOString(),
        "author": {
            "@type": "Person",
            "name": post.author
        },
        "description": post.excerpt,
        "articleBody": post.content
    };

    return (
        <main>
            <Helmet>
                <title>{post.title} — Vrindopnishad</title>
                <meta name="description" content={post.excerpt} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.excerpt} />
                <meta property="og:image" content={post.image} />
                <meta property="og:type" content="article" />
                <meta name="twitter:card" content="summary_large_image" />
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            </Helmet>

            {/* Progress Bar */}
            <motion.div 
                className="fixed top-0 left-0 h-[2px] bg-primary z-50 origin-left"
                style={{ scaleX, width: '100%' }}
            />

            {/* Shared Nav / Back Button */}
            <header className="fixed top-0 left-0 w-full z-40 p-6 flex items-center justify-between mix-blend-difference text-white pointer-events-none">
                <Link to="/" className="pointer-events-auto flex items-center gap-2 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                    <span className="text-sm uppercase tracking-widest font-medium">Return</span>
                </Link>
            </header>

            {/* Cinematic Header / Video Area */}
            <section className="relative w-full h-[819px] bg-cinema-dark flex items-center justify-center sticky top-0 md:relative z-10 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src={post.image} 
                        className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
                        alt={post.title}
                    />
                </div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-cinema-dark via-transparent to-transparent z-10"></div>
                
                {/* Play Button - Solid White Circle */}
                <button className="relative z-20 w-24 h-24 rounded-full bg-white flex items-center justify-center group hover:scale-110 transition-all duration-500 shadow-[0_0_50px_rgba(0,0,0,0.3)] focus:outline-none">
                    <span className="material-symbols-outlined text-5xl text-[#0A0A0A] ml-2 group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                </button>

                {/* Overlay Title Block */}
                <div className="absolute bottom-0 left-0 w-full px-6 md:px-12 pb-12 z-20 translate-y-1/4">
                    <div className="max-w-[680px] mx-auto text-center">
                        <p className="text-white/70 text-[13px] uppercase tracking-[2px] font-medium mb-4">{post.topic} · {post.date}</p>
                        <h1 className="text-white font-display text-4xl md:text-6xl lg:text-7xl font-normal leading-tight italic">{post.title}</h1>
                    </div>
                </div>
            </section>

            {/* Transcript / Context Area */}
            <section className="relative z-20 bg-[var(--bg-main)] pt-32 pb-24 px-6 md:px-12 transition-colors duration-500">
                <article className="max-w-[680px] mx-auto text-lg leading-[1.8] text-[var(--text-main)] space-y-12">
                    <p className="text-xl md:text-2xl leading-relaxed text-zinc-500 dark:text-white/40 first-letter:text-5xl first-letter:font-display first-letter:mr-2 first-letter:float-left first-letter:text-zinc-900 dark:first-letter:text-white font-light italic">
                        {post.excerpt}
                    </p>

                    {post.sanskrit && (
                        <div className="my-16 py-12 px-8 border-y border-zinc-200 dark:border-white/10 relative group bg-zinc-100/50 dark:bg-white/5 backdrop-blur-sm rounded-xl transition-colors">
                            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--bg-main)] px-4 font-display text-[11px] uppercase tracking-[4px] text-zinc-400 dark:text-white/40 transition-colors">Sacred Sanskrit</span>
                            <div className="text-2xl md:text-3xl text-center font-serif italic leading-relaxed text-zinc-900 dark:text-white selection:bg-zinc-900 dark:selection:bg-white selection:text-white dark:selection:text-zinc-900">
                                {post.sanskrit}
                            </div>
                        </div>
                    )}
                    
                    {post.hindi && (
                        <div className="hindi-content font-hindi text-2xl md:text-3xl leading-[1.6] text-zinc-800 dark:text-white/90 mb-16 border-l-2 border-zinc-200 dark:border-white/20 pl-8 py-4 bg-zinc-100 dark:bg-white/5 rounded-r-2xl transition-colors">
                            {post.hindi}
                        </div>
                    )}

                    {post.english && (
                        <div className="prose-wisdom rich-text whitespace-pre-line text-zinc-900 dark:text-white text-lg md:text-xl font-light leading-relaxed">
                            {post.english}
                        </div>
                    )}

                    {!post.hindi && !post.english && (
                        <div className="prose-wisdom rich-text whitespace-pre-line text-zinc-900 dark:text-white text-lg md:text-xl font-light leading-relaxed">
                            {post.content || "Silence is the language of the soul..."}
                        </div>
                    )}

                    <figure className="my-24 w-full md:w-[1000px] md:-ml-[160px]">
                        <img 
                            src={post.image} 
                            className="w-full h-auto rounded-[32px] grayscale hover:grayscale-0 transition-all duration-1000 object-cover shadow-2xl" 
                            alt={post.title} 
                        />
                        <figcaption className="mt-6 text-center text-[13px] uppercase tracking-[2px] text-zinc-400 dark:text-white/30 font-medium italic opacity-60">The observer and the observed merge into one.</figcaption>
                    </figure>
                </article>
            </section>

            {/* Next Journey Block */}
            {nextPost && (
                <Link to={`/post/${nextPost.slug}`} className="block bg-[#0A0A0A] text-white py-24 px-6 md:px-12 text-center group cursor-pointer border-t border-white/10 overflow-hidden relative">
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.03] transition-colors duration-700"></div>
                    <div className="max-w-[680px] mx-auto relative z-10">
                        <p className="text-[13px] uppercase tracking-[2px] text-white/50 mb-6 font-medium">Next Journey</p>
                        <h2 className="font-display text-4xl md:text-5xl italic transition-all duration-500 transform group-hover:scale-[1.02] group-hover:text-white uppercase tracking-[2px]">{nextPost.title}</h2>
                        <div className="mt-12 flex justify-center">
                            <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white group-hover:bg-white group-hover:text-black transition-all duration-500">
                                <span className="material-symbols-outlined text-xl group-hover:animate-bounce">arrow_downward</span>
                            </div>
                        </div>
                    </div>
                </Link>
            )}
        </main>
    )
}

export default ReadingRoom
