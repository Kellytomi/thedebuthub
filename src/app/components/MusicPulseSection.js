'use client';

export default function MusicPulseSection() {
  const newsItems = [
    {
      id: 1,
      title: "Chart Analysis",
      description: "Latest streaming data and music trends from across Nigeria",
      type: "Analytics"
    },
    {
      id: 2,
      title: "Industry News", 
      description: "Breaking news and updates from the Nigerian music industry",
      type: "News"
    },
    {
      id: 3,
      title: "Artist Interviews",
      description: "Exclusive conversations with rising stars and established artists",
      type: "Interviews"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Music Pulse
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Stay updated with the latest trends, news, and insights from Nigeria's dynamic music scene.
          </p>
        </div>

        {/* Screenshot mockups */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {newsItems.map((item, index) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="relative bg-slate-800 rounded-lg overflow-hidden mb-4 aspect-[4/3] transform transition-transform group-hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800"></div>
                
                {/* Mock interface elements */}
                <div className="absolute top-4 left-4 right-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-600 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-700 rounded w-1/2"></div>
                    <div className="h-3 bg-slate-700 rounded w-2/3"></div>
                  </div>
                </div>
                
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-blue-600/20 backdrop-blur-sm rounded p-3">
                    <h3 className="text-white font-semibold text-sm">{item.title}</h3>
                    <p className="text-blue-200 text-xs">{item.type}</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
            View All Updates
          </button>
        </div>
      </div>
    </section>
  );
} 