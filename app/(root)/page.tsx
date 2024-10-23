import HeroSection from '@/components/modules/home/HeroSection';
import KeyFeaturesSection from '@/components/modules/home/KeyFeaturesSection';
import TestimonialsSection from '@/components/modules/home/TestimonialsSection';

export default async function HomePage() {
  return (
    <>
      <HeroSection />
      <KeyFeaturesSection />
      <TestimonialsSection />
    </>
  );
}
