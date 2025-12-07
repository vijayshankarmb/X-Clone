import { Heart, MessageCircle } from "lucide-react";

interface PostProps {
  username: string;
  content: string;
  avatar: string;
}

export default function Post({ username, content, avatar }: PostProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4 w-full max-w-3xl">
      <div className="flex items-start space-x-4">
        <img
          src={avatar}
          alt={username}
          className="w-12 h-12 rounded-full object-cover"
        />

        <div className="flex-1">

          <h3 className="font-bold text-gray-900">{username}</h3>

          <p className="mt-1 text-gray-700">{content}</p>

          <div className="flex space-x-4 mt-3 text-gray-500">

            <button className="flex items-center space-x-1 hover:text-blue-500">
              <MessageCircle size={20} />
              <span>12</span>
            </button>

            <button className="flex items-center space-x-1 hover:text-red-500">
              <Heart size={20} />
              <span>34</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
