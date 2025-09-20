import {
  Layout,
  HeroSection,
  TopAlbumsSection,
  CoverStorySection,
  AudioPlayerSection,
  MusicPulseSection,
  TopTrackSection,
  WhoWeAreSection,
  SocialsSection
} from '@/components';
import TopArticlesSection from '@/components/sections/TopArticlesSection';

export default function Home() {
  return (
    <Layout>
      <main className="min-h-screen">
        <HeroSection />
        <TopAlbumsSection />
        <TopArticlesSection />
        <CoverStorySection />
        {/* <AudioPlayerSection /> */}
        <MusicPulseSection />
        <TopTrackSection />
        <WhoWeAreSection />
        <SocialsSection />
      </main>
    </Layout>
  );
}
