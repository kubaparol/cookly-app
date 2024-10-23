import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import Link from 'next/link';

import { ExternalUrls, ProjectUrls } from '@/constants';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-primary-100 text-primary-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href={ProjectUrls.home} title="Cookly Home">
              <Logo className="max-w-[110px]" />
            </Link>

            <p>Empowering home cooks with delicious recipes and a vibrant community.</p>

            <div className="flex space-x-4">
              <Button asChild size="icon">
                <Link href={ExternalUrls.facebook} target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-6 w-6" />
                </Link>
              </Button>
              <Button asChild size="icon">
                <Link href={ExternalUrls.x} target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-6 w-6" />
                </Link>
              </Button>
              <Button asChild size="icon">
                <Link href={ExternalUrls.instagram} target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-6 w-6" />
                </Link>
              </Button>
              <Button asChild size="icon">
                <Link href={ExternalUrls.youtube} target="_blank" rel="noopener noreferrer">
                  <Youtube className="h-6 w-6" />
                </Link>
              </Button>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="transition-colors hover:text-primary-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-primary-400">
                  Recipes
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-primary-400">
                  Meal Planner
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-primary-400">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="transition-colors hover:text-primary-400">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-primary-400">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-primary-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-primary-400">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div className="grid gap-4">
            <h4 className="text-lg font-semibold">Stay Updated</h4>
            <p>Subscribe to our newsletter for the latest recipes and cooking tips.</p>
            <form className="space-y-2">
              <Input
                type="email"
                placeholder="e.g., johndoe@example.com"
                className="bg-white"
                disabled
              />
              <Button disabled>Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="mt-8 border-t border-primary-700 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Cookly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
