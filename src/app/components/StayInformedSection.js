'use client';

import { useState } from 'react';

export default function StayInformedSection() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      // Here you would typically handle the newsletter subscription
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Stay Informed
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            Get the latest updates on new releases, artist features, and trending music straight to your inbox.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-12">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </div>
          
          {isSubscribed && (
            <div className="mt-4 p-4 bg-green-600/20 border border-green-600/30 rounded-lg">
              <p className="text-green-400 font-medium">
                ✓ Thank you for subscribing! You'll hear from us soon.
              </p>
            </div>
          )}
        </form>

        <div className="border-t border-slate-800 pt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-slate-400 text-sm">
            <div>
              <h4 className="font-semibold text-white mb-4">ABOUT</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Team</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">ARTISTS</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Submit Music</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Artist Portal</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Resources</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">DISCOVER</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Charts</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Playlists</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Genres</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">SUPPORT</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-800 text-slate-500 text-sm">
            <p>&copy; 2024 The Debut Hub. All rights reserved.</p>
          </div>
        </div>
      </div>
    </section>
  );
} 