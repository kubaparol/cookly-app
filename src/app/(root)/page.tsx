import {
  ArrowRight,
  CheckCircle,
  Clock,
  PanelRight,
  ShoppingBag,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { ProjectUrls } from '@/constants';

import { BenefitCard } from '@/components/modules/home/BenefitCard';
import { TestimonialCard } from '@/components/modules/home/TestimonialCard';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default async function HomePage() {
  return (
    <>
      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,var(--tw-gradient-from)_0%,var(--tw-gradient-to)_100%)] from-muted/20 to-transparent"></div>

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <Badge className="px-3 py-1 text-sm" variant="secondary">
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              Your Culinary Journey Starts Here
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Transform Your <span className="text-primary">Cooking Experience</span>
            </h1>
            <p className="max-w-[600px] text-xl text-muted-foreground">
              Create, organize, and share your recipes. Plan meals, track nutrition, and connect
              with a community of food lovers.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href={ProjectUrls.signUp}>
                  Create Free Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">See Features</Link>
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-8 w-8 overflow-hidden rounded-full border-2 border-background bg-muted">
                    <Image
                      src={`/placeholder.svg?height=32&width=32&text=${i + 1}`}
                      alt="User avatar"
                      width={32}
                      height={32}
                    />
                  </div>
                ))}
              </div>
              <div>
                <span className="font-medium">10,000+</span> home chefs already joined
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10 overflow-hidden rounded-xl border shadow-2xl">
              <Image
                src="/placeholder.svg?height=600&width=800&text=Dashboard+Preview"
                alt="Cookly Dashboard"
                width={800}
                height={600}
                className="h-auto w-full"
              />
            </div>

            <div className="absolute -right-6 -top-6 -z-10 h-24 w-24 rounded-full bg-primary/10"></div>
            <div className="absolute -bottom-8 -left-8 -z-10 h-32 w-32 rounded-full bg-primary/10"></div>
          </div>
        </div>
      </section>

      <ul className="grid grid-cols-2 gap-8 md:grid-cols-4">
        <li className="flex flex-col items-center text-center">
          <div className="text-3xl font-bold md:text-4xl">10K+</div>
          <p className="text-muted-foreground">Active Users</p>
        </li>
        <li className="flex flex-col items-center text-center">
          <div className="text-3xl font-bold md:text-4xl">50K+</div>
          <p className="text-muted-foreground">Recipes Created</p>
        </li>
        <li className="flex flex-col items-center text-center">
          <div className="text-3xl font-bold md:text-4xl">100K+</div>
          <p className="text-muted-foreground">Meals Planned</p>
        </li>
        <li className="flex flex-col items-center text-center">
          <div className="text-3xl font-bold md:text-4xl">4.8/5</div>
          <p className="text-muted-foreground">User Rating</p>
        </li>
      </ul>

      <section id="features" className="py-16 md:py-24">
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

      <section className="py-16 md:py-24">
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

      <section id="testimonials" className="py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto mb-12 max-w-[800px] text-center md:mb-16">
            <Badge className="mb-4" variant="outline">
              Testimonials
            </Badge>
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Loved by Home Chefs Everywhere
            </h2>
            <p className="text-lg text-muted-foreground">
              Don&apos;t just take our word for it. Here&apos;s what our users have to say about
              Cookly.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <TestimonialCard
              quote="Cookly has completely transformed how I organize my recipes and plan meals. I've saved so much time and reduced my food waste significantly."
              author="Sarah Johnson"
              role="Home Chef"
              avatar="/placeholder.svg?height=80&width=80&text=SJ"
              rating={5}
            />
            <TestimonialCard
              quote="As someone who cooks for a family with different dietary needs, the meal planning and substitution features have been a game-changer. Highly recommend!"
              author="Michael Chen"
              role="Food Blogger"
              avatar="/placeholder.svg?height=80&width=80&text=MC"
              rating={5}
            />
            <TestimonialCard
              quote="The analytics feature helped me understand which of my recipes are most popular. Now my food blog is thriving thanks to the insights I've gained."
              author="Emily Rodriguez"
              role="Culinary Student"
              avatar="/placeholder.svg?height=80&width=80&text=ER"
              rating={4}
            />
          </div>
        </div>
      </section>

      <section id="faq" className="py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto mb-12 max-w-[800px] text-center md:mb-16">
            <Badge className="mb-4" variant="outline">
              FAQ
            </Badge>
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about Recipe Hub.
            </p>
          </div>

          <div className="mx-auto max-w-4xl">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I import recipes from other websites?</AccordionTrigger>
                <AccordionContent>
                  Recipe Hub allows you to import recipes from any website by simply pasting the
                  URL. Our system will automatically extract the ingredients, instructions, and
                  other details.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Can I access my recipes offline?</AccordionTrigger>
                <AccordionContent>
                  Yes! With our mobile app, your recipes are available offline. Any changes you make
                  while offline will sync once you&apos;re connected again.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>How does the meal planning feature work?</AccordionTrigger>
                <AccordionContent>
                  Our meal planner lets you drag and drop recipes onto a calendar, automatically
                  generates shopping lists based on your plan, and helps you organize your cooking
                  schedule.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Can I share my recipes with non-members?</AccordionTrigger>
                <AccordionContent>
                  You can share your recipes via a public link that anyone can view, even if they
                  don&apos;t have a Recipe Hub account.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                <AccordionContent>
                  We accept all major credit cards, PayPal, and Apple Pay for subscription payments.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>Can I cancel my subscription anytime?</AccordionTrigger>
                <AccordionContent>
                  Yes, you can cancel your subscription at any time. Your access will continue until
                  the end of your current billing period.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
}
