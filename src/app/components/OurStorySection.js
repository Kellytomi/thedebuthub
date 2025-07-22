'use client';

import AlbumCard from './AlbumCard';

export default function OurStorySection() {
  const storyAlbums = [
    {
      id: 4,
      title: "African Giant",
      artist: "Burna Boy",
      imageUrl: "/placeholder-album-4.jpg",
      year: "2023"
    },
    {
      id: 5,
      title: "19 & Dangerous",
      artist: "Ayra Starr", 
      imageUrl: "/placeholder-album-5.jpg",
      year: "2024"
    },
    {
      id: 6,
      title: "Rave & Roses",
      artist: "Rema",
      imageUrl: "/placeholder-album-6.jpg", 
      year: "2024"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Our Story
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Celebrating the diverse sounds and stories that make Nigerian music a global phenomenon.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {storyAlbums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-6">
            Empowering Sound, Creating Stories
          </h3>
          <p className="text-slate-300 text-lg max-w-3xl mx-auto mb-8">
            At The Debut Hub, we believe in the power of music to tell stories, bridge cultures, and create connections. 
            Our platform showcases the incredible talent emerging from Nigeria, giving artists the recognition they deserve 
            while introducing global audiences to the rich tapestry of African music.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
              Discover More Artists
            </button>
            <button className="border border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-colors">
              Submit Your Music
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 