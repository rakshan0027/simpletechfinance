import React, { useEffect } from 'react';
import { useParams, Link, Navigate, useLocation } from 'react-router-dom';
import { getPostBySlug, getRelatedPosts } from '../data/posts';
import SEO from '../components/SEO';
import PostCard from '../components/PostCard';
import { Calendar, User, ArrowLeft, Twitter, Linkedin, Facebook, Share2, Tag } from 'lucide-react';

const PostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : null;
  const location = useLocation();

  // Reset scroll when slug changes (handled in App.tsx generally, but good to ensure for related posts links)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return <Navigate to="/" replace />;
  }

  const relatedPosts = getRelatedPosts(post, 3);
  const isTech = post.category === 'Tech News';
  const currentUrl = window.location.href;
  const encodedUrl = encodeURIComponent(currentUrl);
  const encodedTitle = encodeURIComponent(post.title);

  const shareLinks = [
    {
      name: 'Twitter',
      icon: <Twitter size={18} />,
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'bg-sky-500 hover:bg-sky-600 text-white',
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={18} />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'bg-blue-700 hover:bg-blue-800 text-white',
    },
    {
      name: 'Facebook',
      icon: <Facebook size={18} />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-blue-600 hover:bg-blue-700 text-white',
    },
  ];

  return (
    <>
      <SEO title={post.title} description={post.summary} />
      
      <div className="max-w-4xl mx-auto mt-6">
        <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-12">
            <div className="p-6 md:p-10">
            <Link to={isTech ? '/tech' : '/finance'} className="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-6">
                <ArrowLeft size={16} className="mr-1" /> Back to {post.category}
            </Link>

            <header className="mb-8">
                <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                        isTech ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                        {post.category}
                    </span>
                    {post.tags?.map(tag => (
                         <span key={tag} className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                            <Tag size={10} className="mr-1" /> {tag}
                         </span>
                    ))}
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                {post.title}
                </h1>
                <div className="flex items-center text-sm text-gray-500 space-x-4 border-b border-gray-100 pb-8">
                <span className="flex items-center">
                    <Calendar size={14} className="mr-1.5" />
                    {post.date}
                </span>
                <span className="flex items-center">
                    <User size={14} className="mr-1.5" />
                    {post.author}
                </span>
                </div>
            </header>

            <div 
                className="prose prose-lg prose-blue max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: post.content }} 
            />

            <div className="mt-10 py-6 border-t border-b border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <span className="flex items-center text-sm font-semibold text-gray-700">
                    <Share2 size={16} className="mr-2" /> Share this post:
                </span>
                <div className="flex gap-3">
                    {shareLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2.5 rounded-full transition-colors flex items-center justify-center ${link.color}`}
                        title={`Share on ${link.name}`}
                    >
                        {link.icon}
                    </a>
                    ))}
                </div>
                </div>
            </div>

            <div className="mt-8">
                <p className="text-sm text-gray-500 italic">
                Disclaimer: The content provided on SimpleTechFinance is for informational purposes only. 
                {post.category === 'Finance Basics' && ' It does not constitute financial advice. Always consult with a professional.'}
                </p>
            </div>
            </div>
        </article>

        {relatedPosts.length > 0 && (
            <section>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 px-2">Related Posts</h3>
                <div className="grid gap-6 md:grid-cols-3">
                    {relatedPosts.map(p => (
                        <PostCard key={p.id} post={p} /> 
                    ))}
                </div>
            </section>
        )}
      </div>
    </>
  );
};

export default PostDetail;