import { Book, Clock, Search, Star, Users, Utensils } from 'lucide-react';
import Image from 'next/image';

export default function KeyFeaturesSection() {
  return (
    <section className="wrapper overflow-hidden !py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-primary-100 opacity-70 mix-blend-multiply blur-xl filter"></div>
        <div className="absolute bottom-24 left-0 h-72 w-72 rounded-full bg-primary-200 opacity-70 mix-blend-multiply blur-xl filter"></div>

        <div className="relative">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-extrabold text-primary-900 sm:text-4xl">
              Discover Key Features
            </h2>
            <p className="mt-4 text-xl text-primary-600">
              Our app offers everything you need for your culinary adventures
            </p>
          </div>

          <div className="flex flex-col gap-12">
            <div className="grid gap-24 md:grid-cols-[auto,_auto]">
              <div className="ml-auto space-y-8">
                {features.slice(0, 3).map((feature, index) => (
                  <FeatureCard key={index} feature={feature} />
                ))}
              </div>

              <Image
                src="/arrow.webp"
                alt="App screenshot"
                width={100}
                height={350}
                className="hidden opacity-70 lg:block"
              />
            </div>

            <div className="relative mx-auto w-fit md:col-span-2">
              <Image
                src="https://utfs.io/f/tn9qWFoW4N1fXrHCl5NPVmK1qYxUoOFW08nMBS2ktiLuAc3w"
                alt="App features overview"
                width={800}
                height={300}
                className="mx-auto rounded-lg shadow-xl"
              />
              <div className="absolute -left-8 -top-8 h-24 w-24 animate-pulse rounded-full bg-primary-300 opacity-50"></div>
              <div className="absolute -bottom-8 -right-8 h-32 w-32 animate-pulse rounded-full bg-primary-400 opacity-50"></div>
            </div>

            <div className="space-y-8 lg:col-span-2 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
              {features.slice(3).map((feature, index) => (
                <FeatureCard key={index} feature={feature} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  feature,
}: {
  feature: { icon: React.ReactNode; title: string; description: string };
}) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 ease-in-out hover:shadow-lg">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-primary-600">
            {feature.icon}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-primary-900">{feature.title}</h3>
          <p className="mt-1 text-primary-600">{feature.description}</p>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: <Book className="h-8 w-8" />,
    title: 'Recipe Management',
    description: 'Easily add, edit, and organize your favorite recipes in one place.',
  },
  {
    icon: <Search className="h-8 w-8" />,
    title: 'Smart Search',
    description: 'Quickly find recipes by ingredients, prep time, or diet.',
  },
  {
    icon: <Star className="h-8 w-8" />,
    title: 'Personalized Recommendations',
    description: 'Get recipe suggestions tailored to your preferences and history.',
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: 'Culinary Community',
    description: "Share recipes, comment, and get inspired by other users' cuisines.",
  },
  {
    icon: <Utensils className="h-8 w-8" />,
    title: 'Meal Planning',
    description: 'Create weekly meal plans and automatic shopping lists.',
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: 'Cooking Mode',
    description: 'Step-by-step instructions with timer for perfect execution.',
  },
];
