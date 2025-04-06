import { PanelRight, ShoppingBag, Sparkles, Users, Zap } from 'lucide-react';
import { Clock } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { CardContent } from '@/components/ui/card';
import { Card } from '@/components/ui/card';

export function BenefitsSection() {
  return (
    <section className="wrapper py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-12 max-w-[800px] text-center md:mb-16">
          <Badge className="mb-4" variant="outline">
            Benefits
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Why Thousands of Home Chefs Choose Recipe Hub
          </h2>
          <p className="text-lg text-muted-foreground">
            Our platform is designed to make your cooking journey more enjoyable, organized, and
            inspiring.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <BenefitCard
            icon={<Clock className="h-10 w-10 text-primary" />}
            title="Save Time"
            description="Streamline your cooking process with organized recipes, meal plans, and automated shopping lists."
          />
          <BenefitCard
            icon={<PanelRight className="h-10 w-10 text-primary" />}
            title="Stay Organized"
            description="Keep all your recipes in one place, categorized and searchable for easy access."
          />
          <BenefitCard
            icon={<ShoppingBag className="h-10 w-10 text-primary" />}
            title="Reduce Food Waste"
            description="Plan your meals and shopping efficiently to minimize waste and save money."
          />
          <BenefitCard
            icon={<Users className="h-10 w-10 text-primary" />}
            title="Connect with Others"
            description="Share recipes, get feedback, and discover new ideas from our community of food enthusiasts."
          />
          <BenefitCard
            icon={<Sparkles className="h-10 w-10 text-primary" />}
            title="Improve Your Skills"
            description="Learn new techniques, track your progress, and become a better cook with our guided tools."
          />
          <BenefitCard
            icon={<Zap className="h-10 w-10 text-primary" />}
            title="Personalized Experience"
            description="Get recommendations tailored to your preferences, dietary needs, and cooking habits."
          />
        </div>
      </div>
    </section>
  );
}

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function BenefitCard({ icon, title, description }: BenefitCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="mb-4">{icon}</div>
        <h3 className="mb-2 text-xl font-medium">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
