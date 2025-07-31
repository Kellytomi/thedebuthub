import HeroSection from './components/HeroSection';
import TopAlbumsSection from './components/TopAlbumsSection';
import CoverStorySection from './components/CoverStorySection';
import AudioPlayerSection from './components/AudioPlayerSection';
import MusicPulseSection from './components/MusicPulseSection';
import OurStorySection from './components/TopTrackSection';
import WhoWeAreSection from './components/WhoWeAreSection';
import SocialsSection from './components/SocialsSection';
import StayInformedSection from './components/StayInformedSection';

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <TopAlbumsSection />
      <CoverStorySection />
      {/* <AudioPlayerSection /> */}
      <MusicPulseSection />
      <OurStorySection />
      <WhoWeAreSection />
      <SocialsSection />
      <StayInformedSection />
      
      {/* Footer Text - Cut in half, only top visible - Responsive */}
      <footer className="bg-[#030303] relative overflow-hidden h-[100px] sm:h-[120px] md:h-[150px] lg:h-[180px] xl:h-[200px]">
        <h1 
          className="font-montserrat text-white uppercase text-center absolute left-1/2 transform -translate-x-1/2"
          style={{
            fontSize: 'clamp(80px, 12vw, 164px)',
            opacity: 0.2,
            fontWeight: 600,
            lineHeight: '100%',
            letterSpacing: '0%',
            top: '50%', // Position so text is cut in half
            whiteSpace: 'nowrap'
          }}
        >
          THE DEBUT HUB
        </h1>
      </footer>
    </main>
  );
}
