import HeroSection from '@/components/modules/landing/HeroSection';
import KeyFeaturesSection from '@/components/modules/landing/KeyFeaturesSection';
import TestimonialsSection from '@/components/modules/landing/TestimonialsSection';

export default async function HomePage() {
  return (
    <>
      <HeroSection />
      <KeyFeaturesSection />
      <TestimonialsSection />
    </>
  );
}
