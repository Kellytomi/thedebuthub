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
import { SectionReveal } from '@/components/ui';

export default function Home() {
  return (
    <Layout>
      <main className="min-h-screen">
        <HeroSection />
        <SectionReveal>
          <TopAlbumsSection />
        </SectionReveal>
        <SectionReveal>
          <TopArticlesSection />
        </SectionReveal>
        <SectionReveal>
          <CoverStorySection />
        </SectionReveal>
        {/* <AudioPlayerSection /> */}
        <SectionReveal>
          <MusicPulseSection />
        </SectionReveal>
        <SectionReveal>
          <TopTrackSection />
        </SectionReveal>
        <SectionReveal>
          <WhoWeAreSection />
        </SectionReveal>
        <SectionReveal>
          <SocialsSection />
        </SectionReveal>
      </main>
    </Layout>
  );
}
