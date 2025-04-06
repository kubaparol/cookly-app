'use client';

import { Facebook, Github, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import Link from 'next/link';

import { useNavLinks } from '@/hooks';

import { ExternalUrls, ProjectUrls } from '@/constants/urls';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Logo } from './Logo';

export function Footer() {
  const { quickLinks } = useNavLinks();

  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="flex flex-col gap-4">
            <Link href={ProjectUrls.home} className="flex items-center space-x-3">
              <Logo />
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Making the world a better place through innovative solutions and exceptional user
              experiences.
            </p>
            <div className="mt-2 flex items-center gap-4">
              <Link
                href={ExternalUrls.facebook}
                target="_blank"
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href={ExternalUrls.twitter}
                target="_blank"
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href={ExternalUrls.instagram}
                target="_blank"
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href={ExternalUrls.github}
                target="_blank"
                className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-semibold">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.url}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 text-muted-foreground" />
                <span className="text-sm leading-relaxed text-muted-foreground">
                  123 Innovation Street, Tech City, TC 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">contact@cookly.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-semibold">Subscribe to our newsletter</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Stay updated with our latest news and offers.
            </p>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <Input type="email" placeholder="Enter your email" className="h-10" />
              <Button size="sm" className="h-10">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Cookly. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href={ProjectUrls.termsOfService}
              className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Terms of Service
            </Link>
            <Link
              href={ProjectUrls.privacyPolicy}
              className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Privacy Policy
            </Link>
            <Link
              href={ProjectUrls.cookiePolicy}
              className="text-sm text-muted-foreground transition-colors hover:text-primary">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
