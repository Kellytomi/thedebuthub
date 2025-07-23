import HeroSection from './components/HeroSection';
import TopAlbumsSection from './components/TopAlbumsSection';
import CoverStorySection from './components/CoverStorySection';
import AudioPlayerSection from './components/AudioPlayerSection';
import MusicPulseSection from './components/MusicPulseSection';
import OurStorySection from './components/OurStorySection';
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
    </main>
  );
}
