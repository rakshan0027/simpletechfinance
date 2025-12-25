import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Cpu, TrendingUp } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tech News', path: '/tech' },
    { name: 'Finance Basics', path: '/finance' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                <div className="bg-primary p-1.5 rounded-lg text-white">
                  <Cpu size={24} />
                </div>
                <span className="text-xl font-bold text-gray-900 tracking-tight">
                  Simple<span className="text-primary">Tech</span><span className="text-secondary">Finance</span>
                </span>
              </Link>
            </div>
            
            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'border-primary text-gray-900'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    isActive(link.path)
                      ? 'bg-blue-50 border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">About</h3>
              <p className="text-base text-gray-500">
                SimpleTechFinance makes complex topics easy to understand. We help students and beginners master the basics of technology and personal finance.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">Quick Links</h3>
              <ul className="space-y-4">
                <li><Link to="/tech" className="text-base text-gray-500 hover:text-primary">Tech News</Link></li>
                <li><Link to="/finance" className="text-base text-gray-500 hover:text-primary">Finance Basics</Link></li>
                <li><Link to="/privacy" className="text-base text-gray-500 hover:text-primary">Privacy Policy</Link></li>
                <li><Link to="/disclaimer" className="text-base text-gray-500 hover:text-primary">Disclaimer</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">Categories</h3>
              <div className="flex gap-4">
                 <Link to="/tech" className="flex items-center gap-2 text-gray-500 hover:text-primary group">
                    <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition">
                        <Cpu size={20} className="text-blue-600" />
                    </div>
                    <span>Technology</span>
                 </Link>
                 <Link to="/finance" className="flex items-center gap-2 text-gray-500 hover:text-secondary group">
                    <div className="bg-emerald-100 p-2 rounded-lg group-hover:bg-emerald-200 transition">
                        <TrendingUp size={20} className="text-emerald-600" />
                    </div>
                    <span>Finance</span>
                 </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-base text-gray-400">
              &copy; {new Date().getFullYear()} SimpleTechFinance. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
               {/* Social placeholders */}
               <span className="text-gray-400 hover:text-gray-500 cursor-pointer">Twitter</span>
               <span className="text-gray-400 hover:text-gray-500 cursor-pointer">GitHub</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;