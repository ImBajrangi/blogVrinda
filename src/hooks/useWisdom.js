import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useWisdom = (initialCategory = null) => {
    const [currentCategory, setCurrentCategory] = useState(initialCategory || null);
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(0);
    const POSTS_PER_PAGE = 6;

    // Sync state if initialCategory changes (e.g. route change)
    useEffect(() => {
        setCurrentCategory(initialCategory || null);
        setPage(0);
        setHasMore(true);
        setPosts([]);
    }, [initialCategory]);

    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true);
            try {
                const [postsData, catsData] = await Promise.all([
                    api.fetchPosts(0, POSTS_PER_PAGE, currentCategory),
                    api.fetchCategories()
                ]);
                
                setPosts(postsData.posts);
                setHasMore(postsData.posts.length < postsData.total);
                setCategories(catsData);
                setPage(0);
            } catch (err) {
                console.error("Initial fetch failed", err);
            } finally {
                setLoading(false);
            }
        };
        fetchInitialData();
    }, [currentCategory]);

    const loadMore = async () => {
        if (hasMore && !loadingMore) {
            setLoadingMore(true);
            try {
                const nextPage = page + 1;
                const { posts: newPosts, total } = await api.fetchPosts(nextPage, POSTS_PER_PAGE, currentCategory);
                
                if (newPosts.length > 0) {
                    const combinedPosts = [...posts, ...newPosts];
                    setPosts(combinedPosts);
                    setPage(nextPage);
                    setHasMore(combinedPosts.length < total);
                } else {
                    setHasMore(false);
                }
            } catch (err) {
                console.error("Load more failed", err);
            } finally {
                setLoadingMore(false);
            }
        }
    };

    const getPostById = (id) => {
        return posts.find(post => post.id === id);
    };

    const [currentPost, setCurrentPost] = useState(null);

    const fetchPostBySlug = async (slug) => {
        setLoading(true);
        try {
            const post = await api.fetchPostBySlug(slug);
            setCurrentPost(post);
        } catch (err) {
            console.error("Fetch post failed", err);
            setCurrentPost(null);
        } finally {
            setLoading(false);
        }
    };

    return { posts, categories, currentPost, loading, loadingMore, hasMore, loadMore, fetchPostBySlug };
};
