import React from 'react';
import SEO from '../components/SEO';

export const About: React.FC = () => (
  <>
    <SEO title="About Us" description="Learn about SimpleTechFinance and our mission." />
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About Us</h1>
      <div className="prose prose-blue text-gray-600">
        <p>
          Welcome to <strong>SimpleTechFinance</strong>!
        </p>
        <p>
          We realized that the world of Technology and Finance is filled with complicated jargon, 
          confusing acronyms, and gatekeeping. We are here to change that.
        </p>
        <h3>Our Mission</h3>
        <p>
          To democratize knowledge by explaining the complex simple. Whether you are a student 
          trying to understand AI or a beginner looking to save your first $1,000, we have a guide for you.
        </p>
        <h3>Why Us?</h3>
        <ul>
          <li><strong>No Fluff:</strong> We get straight to the point.</li>
          <li><strong>Beginner Friendly:</strong> No prior knowledge required.</li>
          <li><strong>Free Forever:</strong> Knowledge should be accessible.</li>
        </ul>
      </div>
    </div>
  </>
);

export const Contact: React.FC = () => (
  <>
    <SEO title="Contact Us" />
    <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
      <p className="text-gray-500 mb-8">Have a question or a topic suggestion? We'd love to hear from you.</p>
      
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input type="text" id="name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" placeholder="you@example.com" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea id="message" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" placeholder="How can we help?"></textarea>
        </div>
        <button type="submit" className="w-full bg-primary text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition-colors">
          Send Message
        </button>
      </form>
    </div>
  </>
);

export const Privacy: React.FC = () => (
  <>
    <SEO title="Privacy Policy" />
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
      <div className="prose text-gray-600 text-sm">
        <p>Last updated: October 2023</p>
        <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service.</p>
        <h3>Collecting and Using Your Personal Data</h3>
        <p>We do not collect any personal data unless you voluntarily submit it through our contact forms or newsletter subscription.</p>
        <h3>Cookies</h3>
        <p>We use minimal cookies to ensure the website functions correctly.</p>
      </div>
    </div>
  </>
);

export const Disclaimer: React.FC = () => (
  <>
    <SEO title="Disclaimer" />
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Disclaimer</h1>
      <div className="prose text-gray-600">
        <h3>General Disclaimer</h3>
        <p>The information contained on SimpleTechFinance is for general information purposes only.</p>
        <h3>Financial Disclaimer</h3>
        <p>We are not financial advisors. The content provided on this website is for educational purposes only and should not be considered professional financial advice. Always consult with a qualified financial professional before making any investment decisions.</p>
      </div>
    </div>
  </>
);