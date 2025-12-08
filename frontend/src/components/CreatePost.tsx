import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/api';
import { Image, Smile, Calendar, MapPin, AlignLeft } from 'lucide-react';

interface CreatePostProps {
    onPostCreated: () => void;
}

export function CreatePost({ onPostCreated }: CreatePostProps) {
    const [newPostContent, setNewPostContent] = useState("");
    const [posting, setPosting] = useState(false);
    const [error, setError] = useState("");

    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPostContent.trim()) return;

        try {
            setPosting(true);
            setError("");
            const response = await api.createPost(newPostContent);
            if (response.success) {
                setNewPostContent("");
                onPostCreated();
            }
        } catch (err: any) {
            setError(err.message || "Failed to create post");
        } finally {
            setPosting(false);
        }
    };

    return (
        <div className="border-b border-gray-100 p-4">
            <form onSubmit={handleCreatePost}>
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0"></div>
                    <div className="flex-1">
                        <Input
                            placeholder="What is happening?!"
                            value={newPostContent}
                            onChange={(e) => setNewPostContent(e.target.value)}
                            className="border-none shadow-none text-xl p-0 focus-visible:ring-0 placeholder:text-gray-500 mb-4"
                        />
                        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                            <div className="flex items-center gap-1 text-sky-500">
                                <Button type="button" variant="ghost" size="icon" className="rounded-full text-sky-500 hover:bg-sky-50 hover:text-sky-600">
                                    <Image size={20} />
                                </Button>
                                <Button type="button" variant="ghost" size="icon" className="rounded-full text-sky-500 hover:bg-sky-50 hover:text-sky-600">
                                    <AlignLeft size={20} />
                                </Button>
                                <Button type="button" variant="ghost" size="icon" className="rounded-full text-sky-500 hover:bg-sky-50 hover:text-sky-600">
                                    <Smile size={20} />
                                </Button>
                                <Button type="button" variant="ghost" size="icon" className="rounded-full text-sky-500 hover:bg-sky-50 hover:text-sky-600">
                                    <Calendar size={20} />
                                </Button>
                                <Button type="button" variant="ghost" size="icon" className="rounded-full text-sky-500 hover:bg-sky-50 hover:text-sky-600">
                                    <MapPin size={20} />
                                </Button>
                            </div>
                            <Button
                                type="submit"
                                disabled={posting || !newPostContent.trim()}
                                className="bg-sky-500 text-white hover:bg-sky-600 rounded-full font-bold px-4 transition-colors disabled:opacity-50"
                            >
                                {posting ? 'Posting...' : 'Post'}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
