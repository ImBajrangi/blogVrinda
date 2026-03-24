import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useWisdom = (initialCategory = null) => {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const [currentCategory, setCurrentCategory] = useState(initialCategory);
    const POSTS_PER_PAGE = 6;

    useEffect(() => {
        if (initialCategory !== currentCategory) {
            setCurrentCategory(initialCategory);
            setPage(0);
            setHasMore(true);
        }
    }, [initialCategory]);

    useEffect(() => {
        const loadInitialWisdom = async () => {
            setLoading(true);
            const [postsData, catsData] = await Promise.all([
                api.fetchPosts(0, POSTS_PER_PAGE - 1, currentCategory),
                api.fetchCategories()
            ]);
            setPosts(postsData);
            setCategories(catsData);
            setLoading(false);
            if (postsData.length < POSTS_PER_PAGE) setHasMore(false);
        };
        loadInitialWisdom();
    }, [currentCategory]);

    const loadMore = async () => {
        if (loadingMore || !hasMore) return;
        setLoadingMore(true);
        const nextPage = page + 1;
        const from = nextPage * POSTS_PER_PAGE;
        const to = from + POSTS_PER_PAGE - 1;
        
        const newPosts = await api.fetchPosts(from, to, currentCategory);
        if (newPosts.length > 0) {
            setPosts(prev => [...prev, ...newPosts]);
            setPage(nextPage);
        }
        
        if (newPosts.length < POSTS_PER_PAGE) {
            setHasMore(false);
        }
        
        setLoadingMore(false);
    };

    const getPostById = (id) => {
        return posts.find(post => post.id === id);
    };

    const getPostBySlug = (slug) => {
        return posts.find(post => post.slug === slug);
    };

    return {
        posts: posts,
        categories,
        loading,
        loadingMore,
        hasMore,
        loadMore,
        getPostById,
        getPostBySlug
    };
};
