'use client';

import Image from 'next/image';

export default function CoverStorySection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Cover Story
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Behind the scenes and exclusive stories from Nigeria's biggest music stars and their latest releases.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-purple-600 to-pink-700 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Artist Spotlight</h3>
                <p className="text-purple-200">Featured Story</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">
              Details about artist's song
            </h3>
            <p className="text-slate-300 text-lg leading-relaxed">
              Discover the inspiration behind the latest hits from Nigeria's most talented artists. From the creative process to the final recording, get an exclusive look into the music that's shaping the industry.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Our cover stories dive deep into the artistry, cultural impact, and personal journeys of the musicians who are defining contemporary African music on the global stage.
            </p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
              Read Full Story
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 