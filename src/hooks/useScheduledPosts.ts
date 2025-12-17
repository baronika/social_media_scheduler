import { useState, useEffect } from 'react';
import { ScheduledPost } from '@/types/post';

const STORAGE_KEY = 'scheduled_posts';

export function useScheduledPosts() {
  const [posts, setPosts] = useState<ScheduledPost[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setPosts(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse stored posts:', e);
      }
    }
  }, []);

  const savePosts = (newPosts: ScheduledPost[]) => {
    setPosts(newPosts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPosts));
  };

  const addPost = (post: Omit<ScheduledPost, 'id' | 'createdAt'>) => {
    const newPost: ScheduledPost = {
      ...post,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    savePosts([...posts, newPost]);
    return newPost;
  };

  const deletePost = (id: string) => {
    savePosts(posts.filter(post => post.id !== id));
  };

  return { posts, addPost, deletePost };
}
