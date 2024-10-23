import { ArrowRight, BookOpen, Share2, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="wrapper grid gap-12">
      <div className="mb-12 px-4 pt-6 text-center text-primary-950 sm:px-6 md:pt-32 lg:px-8">
        <h1 className="mb-4 text-4xl font-extrabold sm:text-5xl md:text-6xl">
          Cook, Share, Inspire
        </h1>
        <p className="mb-8 text-xl text-primary-800 sm:text-2xl md:text-3xl">
          Your culinary journey starts here
        </p>
        <Button asChild size="lg">
          <Link href="">
            Get Started
            <ArrowRight className="ml-2 size-5" />
          </Link>
        </Button>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="flex flex-col items-center">
            <BookOpen className="mb-4 h-12 w-12 text-primary-600" />
            <h3 className="text-lg font-semibold">Create Recipes</h3>
            <p className="mt-2 text-sm text-primary-700">
              Easily add and organize your favorite recipes
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Share2 className="mb-4 h-12 w-12 text-primary-600" />
            <h3 className="text-lg font-semibold">Share with Friends</h3>
            <p className="mt-2 text-sm text-primary-700">
              Spread the joy of cooking with your network
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Users className="mb-4 h-12 w-12 text-primary-600" />
            <h3 className="text-lg font-semibold">Join the Community</h3>
            <p className="mt-2 text-sm text-primary-700">
              Connect with food lovers from around the world
            </p>
          </div>
        </div>

        <div className="relative mx-auto mt-24 w-full max-w-5xl px-4 sm:px-6 md:mt-32 lg:px-8">
          <div className="absolute inset-0 -rotate-2 transform rounded-lg bg-primary-200"></div>
          <div className="absolute inset-0 rotate-2 transform rounded-lg bg-primary-100"></div>
          <div className="relative overflow-hidden">
            <Image
              src="/hero.webp"
              alt="Application Dashboard"
              width={1280}
              height={720}
              className="h-auto w-full"
            />
          </div>
          <div className="absolute -left-6 -top-12 h-24 w-24 animate-pulse rounded-full bg-primary-400 opacity-50"></div>
          <div className="absolute -bottom-4 -right-4 h-32 w-32 animate-pulse rounded-full bg-primary-500 opacity-50"></div>
        </div>
      </div>
    </section>
  );
}
