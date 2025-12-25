import React from 'react';
import { Link } from 'react-router-dom';
import { getLatestPosts } from '../data/posts';
import PostCard from '../components/PostCard';
import SEO from '../components/SEO';
import { ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const latestPosts = getLatestPosts(6); // Show 6 latest posts

  return (
    <>
      <SEO title="Home" description="SimpleTechFinance home page featuring latest updates in tech and finance." />
      
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Tech & Money, <span className="text-primary">Simplified.</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
          We break down complex Tech News and Finance Basics into clear, simple English for students and beginners.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/tech" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-blue-700">
            Read Tech News
          </Link>
          <Link to="/finance" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200">
            Learn Finance
          </Link>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Latest Updates</h2>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
      
      {/* Newsletter / CTA Section */}
      <section className="bg-dark rounded-2xl p-8 md:p-12 text-center text-white mt-12 mb-8">
        <h2 className="text-2xl font-bold mb-4">Get Smarter in 5 Minutes</h2>
        <p className="text-gray-300 mb-6 max-w-lg mx-auto">
          Join other students learning the basics of the future economy. No spam, just knowledge.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary w-full"
          />
          <button className="px-6 py-3 bg-primary rounded-md font-medium hover:bg-blue-600 transition-colors w-full sm:w-auto">
            Subscribe
          </button>
        </div>
      </section>
    </>
  );
};

export default Home;