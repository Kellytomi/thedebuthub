'use client';

import Image from 'next/image';

export default function CoverStorySection() {
  return (
    <section 
      className="relative overflow-hidden mx-auto"
      style={{
        width: '100%',
        maxWidth: '1440px',
        height: '1024px',
        backgroundColor: '#030303'
      }}
    >


      {/* Blue gradient blur effect on the right */}
      <div 
        className="absolute"
        style={{
          width: '32px',
          height: '1024px',
          top: '14px',
          left: '1298px',
          background: '#006DFF',
          backdropFilter: 'blur(300px)',
          filter: 'blur(150px)'
        }}
      />

      {/* Blue accent squares scattered */}
      <div className="absolute inset-0">
        {/* Top left blue squares */}
        <div 
          className="absolute bg-blue-600" 
          style={{ 
            top: '120px', 
            left: '80px',
            width: '81.37px',
            height: '80.23px'
          }} 
        />
        <div 
          className="absolute bg-blue-600" 
          style={{ 
            top: '40px', 
            left: '200px',
            width: '81.37px',
            height: '80.23px'
          }} 
        />
        
        {/* Bottom right blue squares */}
        <div 
          className="absolute bg-blue-600" 
          style={{ 
            bottom: '160px', 
            right: '120px',
            width: '81.37px',
            height: '80.23px'
          }} 
        />
        <div 
          className="absolute bg-blue-600" 
          style={{ 
            bottom: '40px', 
            right: '200px',
            width: '81.37px',
            height: '80.23px'
          }} 
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full">
        {/* Top tagline */}
        <div className="text-center pt-16 mb-12">
          <p 
            className="italic"
            style={{ 
              fontFamily: "'Dancing Script', cursive",
              fontSize: '32px'
            }}
          >
            <span style={{ color: '#646464' }}>Where words fail,</span><br />
            <span className="text-white/80">Music speaks</span>
          </p>
        </div>

                 {/* Cover Story Header */}
         <div className="text-center mb-16">
           <h2 
             className="text-white font-bold"
             style={{ 
               fontFamily: "'Montserrat', sans-serif",
               fontSize: '48px',
               letterSpacing: '-1px'
             }}
           >
             Cover Story
           </h2>
           
           {/* Underline SVG */}
           <div className="flex justify-center mb-6">
             <svg width="72" height="20" viewBox="0 0 72 20" fill="none" xmlns="http://www.w3.org/2000/svg">
               <g filter="url(#filter0_f_48_3159)">
                 <path d="M4.60278 4.90981C4.87059 5.03038 6.17689 5.53795 8.83762 6.2917C10.3038 6.70705 12.1111 6.75763 20.4341 6.30772C28.7572 5.85781 43.5684 4.79557 52.3199 4.35065C61.0714 3.90573 63.3145 4.11031 64.7529 4.30279C66.7723 4.57302 67.5408 4.93934 67.8032 5.2588C67.9538 5.44205 67.7811 5.85274 67.6107 6.14448C67.4403 6.43622 67.1858 6.64375 59.8265 7.6032C52.4673 8.56265 38.0109 10.2677 30.6339 11.2583C23.257 12.2488 23.3975 12.4732 24.6283 12.7881C25.859 13.1031 28.1757 13.5018 33.5958 13.7983C39.0159 14.0948 47.4693 14.277 52.0885 14.4093C56.7077 14.5417 57.2367 14.6188 57.777 14.7791C58.3173 14.9394 58.8529 15.1805 59.4048 15.4289" stroke="#006DFF" strokeWidth="2" strokeLinecap="round"/>
               </g>
               <defs>
                 <filter id="filter0_f_48_3159" x="0.602539" y="0.0842056" width="71.2583" height="19.345" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                   <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                   <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                   <feGaussianBlur stdDeviation="1.5" result="effect1_foregroundBlur_48_3159"/>
                 </filter>
               </defs>
             </svg>
           </div>
          <p 
            className="text-white/70 max-w-4xl mx-auto"
            style={{ 
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '18px',
              lineHeight: '1.6'
            }}
          >
            Meet the artist who broke the charts this week. Get an exclusive look into their<br />
            journey, inspirations, and what's next for them.
          </p>
        </div>

        {/* Artist Story Content */}
        <div className="flex items-center justify-center px-16 gap-16">
          {/* Artist Image with Badge */}
          <div className="relative flex-shrink-0">
            {/* Top Artist Badge */}
            <div 
              className="absolute -top-4 -left-4 z-20"
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '5px',
                border: '1px solid #FFFFFF',
                background: 'linear-gradient(180deg, #BF00FF 0%, #005CD6 100%)',
                transform: 'rotate(4.87deg)'
              }}
            >
              <div className="w-full h-full flex flex-col items-center justify-center text-white text-xs font-bold leading-tight">
                <div>Top</div>
                <div>artist</div>
              </div>
            </div>

            {/* Artist Image */}
            <div 
              className="relative overflow-hidden"
              style={{
                width: '400px',
                height: '520px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%)'
              }}
            >
              {/* Artist placeholder with realistic styling */}
              <div className="w-full h-full bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 flex items-center justify-center relative">
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-blue-500/10" />
                
                {/* Artist figure placeholder */}
                <div className="relative text-white/40">
                  <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Artist Details */}
          <div className="flex-1 max-w-xl">
            <h3 
              className="text-white font-bold mb-6"
              style={{ 
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '32px',
                letterSpacing: '-0.5px'
              }}
            >
              Details about artist's song
            </h3>
            
            <p 
              className="text-white/70 mb-8 leading-relaxed"
              style={{ 
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '16px',
                lineHeight: '1.8'
              }}
            >
              This week's chartbreaker is ZAYA, a 24-year-old alt-R&B artist whose 
              debut album, Silk Notes, just hit #1 on DebutHub's New Vibes Chart. 
              Written over six months between Lagos and London, the 9-track project 
              blends soul, Afrobeats, and chillwave. ZAYA says the album is "a love 
              letter to late nights, soft healing, and second chances."
            </p>

            {/* Read More Button */}
            <button
              className="text-white font-semibold relative overflow-hidden hover:scale-105 transition-transform"
              style={{
                width: '160px',
                height: '50px',
                borderRadius: '6px',
                background: 'linear-gradient(180deg, #006DFF 0%, #004199 100%)',
                boxShadow: '0px 2px 7px 0px rgba(87, 87, 87, 0.17)',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '14px',
                padding: '8px 16px'
              }}
            >
              {/* Border gradient overlay */}
              <div 
                className="absolute inset-0 rounded-md p-px"
                style={{
                  background: 'linear-gradient(180deg, #338AFF 0%, #003883 100%)',
                  zIndex: -1
                }}
              >
                <div 
                  className="w-full h-full rounded-md"
                  style={{
                    background: 'linear-gradient(180deg, #006DFF 0%, #004199 100%)'
                  }}
                />
              </div>
              Read more
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 