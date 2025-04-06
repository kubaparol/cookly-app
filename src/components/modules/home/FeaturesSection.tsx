import { CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { ProjectUrls } from '@/constants';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function FeaturesSection() {
  return (
    <section id="features" className="wrapper py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-12 max-w-[800px] text-center md:mb-16">
          <Badge className="mb-4" variant="outline">
            Features
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Everything You Need to Elevate Your Cooking
          </h2>
          <p className="text-lg text-muted-foreground">
            Cookly combines powerful features with an intuitive interface to make cooking, meal
            planning, and recipe management effortless.
          </p>
        </div>

        <Tabs defaultValue="create" className="w-full">
          <div className="mb-8 flex justify-center">
            <TabsList className="grid w-full max-w-[600px] grid-cols-3">
              <TabsTrigger value="create">Create</TabsTrigger>
              <TabsTrigger value="organize">Organize</TabsTrigger>
              <TabsTrigger value="analyze">Analyze</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="create" className="mt-0">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
              <div className="order-2 lg:order-1">
                <h3 className="mb-4 text-2xl font-bold">Create Beautiful Recipes</h3>
                <p className="mb-6 text-muted-foreground">
                  Our intuitive recipe builder makes it easy to create, format, and share your
                  culinary creations with the world.
                </p>
                <ul className="space-y-4">
                  {[
                    'Step-by-step guided recipe creation',
                    'Rich formatting with images and videos',
                    'Automatic nutrition calculation',
                    'Ingredient substitution suggestions',
                    'Equipment and preparation tips',
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-6" asChild>
                  <Link href={ProjectUrls.signUp}>Start Creating</Link>
                </Button>
              </div>
              <div className="relative order-1 lg:order-2">
                <div className="overflow-hidden rounded-xl border shadow-xl">
                  <Image
                    src="/placeholder.svg?height=500&width=700&text=Recipe+Builder"
                    alt="Recipe Builder"
                    width={700}
                    height={500}
                    className="h-auto w-full"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 -z-10 h-24 w-24 rounded-full bg-primary/10"></div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="organize" className="mt-0">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
              <div className="relative">
                <div className="overflow-hidden rounded-xl border shadow-xl">
                  <Image
                    src="/placeholder.svg?height=500&width=700&text=Recipe+Organization"
                    alt="Recipe Organization"
                    width={700}
                    height={500}
                    className="h-auto w-full"
                  />
                </div>
                <div className="absolute -left-4 -top-4 -z-10 h-24 w-24 rounded-full bg-primary/10"></div>
              </div>
              <div>
                <h3 className="mb-4 text-2xl font-bold">Organize Your Culinary Collection</h3>
                <p className="mb-6 text-muted-foreground">
                  Keep all your recipes organized, searchable, and accessible from any device,
                  anytime.
                </p>
                <ul className="space-y-4">
                  {[
                    'Smart categorization and tagging',
                    'Powerful search and filtering',
                    'Custom collections and favorites',
                    'Import recipes from websites',
                    'Cloud sync across all your devices',
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-6" asChild>
                  <Link href={ProjectUrls.signUp}>Get Organized</Link>
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analyze" className="mt-0">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
              <div className="relative order-2 lg:order-1">
                <div className="overflow-hidden rounded-xl border shadow-xl">
                  <Image
                    src="/placeholder.svg?height=500&width=700&text=Recipe+Analytics"
                    alt="Recipe Analytics"
                    width={700}
                    height={500}
                    className="h-auto w-full"
                  />
                </div>
                <div className="absolute -left-4 -top-4 -z-10 h-24 w-24 rounded-full bg-primary/10"></div>
              </div>
              <div>
                <h3 className="mb-4 text-2xl font-bold">Gain Valuable Insights</h3>
                <p className="mb-6 text-muted-foreground">
                  Track your cooking habits, analyze recipe performance, and discover trends to
                  improve your culinary skills.
                </p>
                <ul className="space-y-4">
                  {[
                    'Recipe popularity and engagement metrics',
                    'Cooking streak and habit tracking',
                    'Nutritional analysis and trends',
                    'Audience demographics for shared recipes',
                    'Personalized recommendations',
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-6" asChild>
                  <Link href="/signup">Explore Analytics</Link>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
