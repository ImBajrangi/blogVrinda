import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '../lib/supabase';

const Seo = ({ 
    title: pageTitle, 
    description: pageDescription, 
    image: pageImage, 
    article = false,
    slug = ''
}) => {
    const [siteConfig, setSiteConfig] = useState({
        title: 'Vrindopnishad — The Silence of Wisdom',
        description: 'Vrindopnishad is a sanctuary for spiritual reflections, exploring the depths of consciousness and sacred wisdom.',
        keywords: 'spirituality, meditation, wisdom, consciousness, vrindopnishad, sacred text',
        ogImage: 'https://vrindopnishad.in/og-image.jpg',
        googleVerification: '',
        favicon: '/favicon.ico',
        author: 'Vrindopnishad'
    });

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                // Try to get from Cache first (simple memory cache for current session)
                const cached = sessionStorage.getItem('vrinda_site_config');
                if (cached) {
                    setSiteConfig(JSON.parse(cached));
                    return;
                }

                const { data, error } = await supabase
                    .from('site_config')
                    .select('data')
                    .eq('key', 'vrinda_blog')
                    .maybeSingle();
                
                if (data && data.data) {
                    setSiteConfig(data.data);
                    sessionStorage.setItem('vrinda_site_config', JSON.stringify(data.data));
                }
            } catch (err) {
                console.error('SEO Configuration Fetch Error:', err);
            }
        };
        fetchConfig();
    }, []);

    const seoTitle = pageTitle ? `${pageTitle} | ${siteConfig.title}` : siteConfig.title;
    const seoDescription = pageDescription || siteConfig.description;
    const seoImage = pageImage || siteConfig.ogImage;
    const canonicalUrl = `https://vrindopnishad.in${slug ? `/post/${slug}` : ''}`;

    return (
        <Helmet>
            {/* Base Meta Tags */}
            <title>{seoTitle}</title>
            <meta name="description" content={seoDescription} />
            <meta name="keywords" content={siteConfig.keywords} />
            <meta name="author" content={siteConfig.author} />
            {siteConfig.googleVerification && (
                <meta name="google-site-verification" content={siteConfig.googleVerification} />
            )}

            {/* Canonical Link */}
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={article ? 'article' : 'website'} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={seoTitle} />
            <meta property="og:description" content={seoDescription} />
            <meta property="og:image" content={seoImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={canonicalUrl} />
            <meta name="twitter:title" content={seoTitle} />
            <meta name="twitter:description" content={seoDescription} />
            <meta name="twitter:image" content={seoImage} />

            {/* Structured Data (Schema.org) */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": article ? "BlogPosting" : "WebSite",
                    "url": "https://vrindopnishad.in/",
                    "name": "Vrindopnishad",
                    "description": siteConfig.description,
                    "publisher": {
                        "@type": "Organization",
                        "name": "Vrindopnishad",
                        "logo": {
                            "@type": "ImageObject",
                            "url": "https://vrindopnishad.in/logo.png"
                        }
                    }
                })}
            </script>
        </Helmet>
    );
};

export default Seo;
