import React from 'react';
import { getPostsByCategory } from '../data/posts';
import { Category } from '../types';
import PostCard from '../components/PostCard';
import SEO from '../components/SEO';
import { Cpu, TrendingUp } from 'lucide-react';

interface CategoryPageProps {
  category: Category;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category }) => {
  const posts = getPostsByCategory(category);
  const isTech = category === 'Tech News';

  return (
    <>
      <SEO title={category} description={`Latest articles and guides about ${category}.`} />
      
      <div className="py-8">
        <div className="mb-10 text-center">
            <div className={`inline-flex items-center justify-center p-3 rounded-full mb-4 ${
                isTech ? 'bg-blue-100 text-primary' : 'bg-emerald-100 text-secondary'
            }`}>
                {isTech ? <Cpu size={32} /> : <TrendingUp size={32} />}
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{category}</h1>
            <p className="mt-2 text-gray-600">
                {isTech 
                    ? "Stay updated with the latest breakthroughs and trends in technology." 
                    : "Master your money with simple guides on saving, investing, and budgeting."}
            </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500">No posts found in this category yet.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryPage;