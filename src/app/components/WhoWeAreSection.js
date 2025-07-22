'use client';

export default function WhoWeAreSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Who We Are
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              The Debut Hub is Nigeria's premier platform for discovering and celebrating emerging musical talent. 
              We're passionate about showcasing the incredible diversity and creativity of Nigerian artists to the world.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Our mission is to provide a comprehensive platform where music lovers can discover new sounds, 
              artists can gain exposure, and the rich culture of Nigerian music can continue to flourish on the global stage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Learn More
              </button>
              <button className="border border-slate-600 text-slate-300 hover:border-slate-500 hover:text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Contact Us
              </button>
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-4xl font-bold mb-2">the</div>
                  <div className="text-5xl font-bold mb-2">debut</div>
                  <div className="text-4xl font-bold bg-blue-800 px-4 py-2 rounded-lg">hub</div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-400 rounded-full opacity-80"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-purple-400 rounded-full opacity-60"></div>
              <div className="absolute top-1/3 -left-8 w-6 h-6 bg-pink-400 rounded-full opacity-70"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 