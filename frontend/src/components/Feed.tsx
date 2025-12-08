import React, { useEffect, useState } from 'react';
import Post from '@/components/Post';
import { CreatePost } from '@/components/CreatePost'; // Ensure this export exists or use default
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

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

export function Feed() {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { isAuthenticated, user } = useAuth();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            // Keep loading true only on first load if we want to avoid flicker on refresh
            // But for simple implementation, we can set it. 
            // Or maybe show a top loader.
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

    return (
        <div className="w-full">
            <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 p-4">
                <h1 className="font-bold text-xl cursor-pointer">For you</h1>
            </div>

            {isAuthenticated && <CreatePost onPostCreated={fetchPosts} />}

            {error && (
                <div className="p-4 text-red-500 text-center">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="flex justify-center p-8">
                    <Loader2 className="animate-spin text-sky-500" />
                </div>
            ) : posts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">No posts yet.</div>
            ) : (
                posts.map((post) => (
                    <Post
                        key={post.id}
                        id={post.id}
                        username={post.author.userName}
                        content={post.content}
                        avatar={post.author.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${post.author.userName}`}
                        isOwner={user?.id === post.author.id}
                        onDelete={fetchPosts}
                        onUpdate={fetchPosts}
                    />
                ))
            )}
        </div>
    );
}
