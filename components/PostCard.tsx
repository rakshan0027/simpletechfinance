import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface PostCardProps {
  post: BlogPost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const isTech = post.category === 'Tech News';

  return (
    <article className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
            isTech ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
          }`}>
            {post.category}
          </span>
          <span className="flex items-center text-xs text-gray-500">
            <Calendar size={12} className="mr-1" />
            {post.date}
          </span>
        </div>
        
        <Link to={`/post/${post.slug}`} className="group">
          <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h2>
        </Link>
        
        <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">
          {post.summary}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <span className="flex items-center text-xs text-gray-500 font-medium">
            <User size={12} className="mr-1" />
            {post.author}
          </span>
          <Link 
            to={`/post/${post.slug}`} 
            className="inline-flex items-center text-sm font-semibold text-primary hover:text-blue-800 transition-colors"
          >
            Read Post <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard;