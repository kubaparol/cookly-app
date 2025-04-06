import { BenefitsSection } from '@/components/modules/home/BenefitsSection';
import { CtaSection } from '@/components/modules/home/CtaSection';
import { FaqSection } from '@/components/modules/home/FaqSection';
import { FeaturesSection } from '@/components/modules/home/FeaturesSection';
import { HeroSection } from '@/components/modules/home/HeroSection';
import { StatsSection } from '@/components/modules/home/StatsSection';
import { TestimonialsSection } from '@/components/modules/home/TestimonialsSection';

export default async function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <BenefitsSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
