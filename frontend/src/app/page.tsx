'use client';

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Post from '@/components/Post'
import { api } from '@/lib/api'
import { useAuth } from '@/contexts/AuthContext'
import { Input } from '@/components/ui/input'

interface PostData {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    userName: string;
    name?: string;
    avatarUrl?: string;
  };
}

const Home = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [posting, setPosting] = useState(false);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await api.getAllPosts();
      if (response.success && response.posts) {
        setPosts(response.posts);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    try {
      setPosting(true);
      const response = await api.createPost(newPostContent);
      if (response.success) {
        setNewPostContent("");
        fetchPosts(); // Refresh posts
      }
    } catch (err: any) {
      setError(err.message || "Failed to create post");
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className='bg-gray-50 p-10 min-h-screen flex flex-col items-center gap-6'>
      <h1 className='font-bold text-6xl'>Welcome to X-Clone</h1>
      
      {!isAuthenticated ? (
        <Link href='/sign-up'>
          <Button className='cursor-pointer hover:bg-gray-800 hover:scale-105'>Get Started</Button>
        </Link>
      ) : (
        <div className='w-full max-w-3xl'>
          <form onSubmit={handleCreatePost} className='mb-6'>
            <div className='bg-white p-4 rounded-lg shadow'>
              <Input
                placeholder="What's on your mind?"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className='mb-2'
              />
              <Button
                type="submit"
                disabled={posting || !newPostContent.trim()}
                className='w-full bg-black text-white hover:bg-gray-800'
              >
                {posting ? 'Posting...' : 'Post'}
              </Button>
            </div>
          </form>
        </div>
      )}

      {error && (
        <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded w-full max-w-3xl'>
          {error}
        </div>
      )}

      <div className='w-full max-w-3xl'>
        {loading ? (
          <div className='text-center py-8'>Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className='text-center py-8 text-gray-500'>No posts yet. Be the first to post!</div>
        ) : (
          posts.map((post) => (
            <Post
              key={post.id}
              username={post.author.userName}
              content={post.content}
              avatar={post.author.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${post.author.userName}`}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Home
