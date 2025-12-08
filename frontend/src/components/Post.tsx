import { Trash2, Edit2 } from "lucide-react";
import { useState } from "react";
import { api } from "@/lib/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface PostProps {
  id: number;
  username: string;
  content: string;
  avatar: string;
  isOwner: boolean;
  onDelete: () => void;
  onUpdate: () => void;
}

export default function Post({ id, username, content, avatar, isOwner, onDelete, onUpdate }: PostProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await api.deletePost(id);
      onDelete();
    } catch (error) {
      console.error("Failed to delete post", error);
      alert("Failed to delete post");
    }
  };

  const handleUpdate = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      setLoading(true);
      await api.updatePost(id, editContent);
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error("Failed to update post", error);
      alert("Failed to update post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cursor-pointer border-b border-gray-100 p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start space-x-3">
        <img
          src={avatar}
          alt={username}
          className="w-10 h-10 rounded-full object-cover"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <h3 className="font-bold text-gray-900 truncate hover:underline">{username}</h3>
              <span className="text-gray-500 text-sm truncate">@{username.toLowerCase().replace(/\s/g, '')}</span>
              <span className="text-gray-500 text-sm">·</span>
              <span className="text-gray-500 text-sm hover:underline">2h</span>
            </div>
            {isOwner && (
              <div className="flex gap-2">
                <button onClick={(e) => { e.stopPropagation(); setIsEditing(!isEditing) }} className="text-gray-400 hover:text-blue-500">
                  <Edit2 size={16} />
                </button>
                <button onClick={handleDelete} className="text-gray-400 hover:text-red-500">
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>

          {isEditing ? (
            <div className="mt-2" onClick={(e) => e.stopPropagation()}>
              <Input
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="mb-2"
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
                <Button size="sm" onClick={handleUpdate} disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
              </div>
            </div>
          ) : (
            <p className="mt-1 text-gray-900 whitespace-pre-wrap break-words text-[15px]">{content}</p>
          )}
        </div>
      </div>
    </div>
  );
}
