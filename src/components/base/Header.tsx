'use client';

import { SignedOut } from '@clerk/nextjs';
import { SignOutButton } from '@clerk/nextjs';
import { SignedIn } from '@clerk/nextjs';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { useNavLinks } from '@/hooks';

import { cn } from '@/utils';

import { ProjectUrls } from '@/constants';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { ModeToggle } from './ModeToggle';

const AuthButtons = () => {
  return (
    <>
      <SignedIn>
        <Button asChild>
          <Link href={ProjectUrls.dashboard}>Dashboard</Link>
        </Button>

        <SignOutButton>
          <Button variant="outline">Sign Out</Button>
        </SignOutButton>
      </SignedIn>

      <SignedOut>
        <Button asChild>
          <Link href={ProjectUrls.signIn}>Login</Link>
        </Button>
      </SignedOut>
    </>
  );
};

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { quickLinks } = useNavLinks();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center space-x-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground shadow-sm transition-transform hover:scale-105">
              L
            </span>
            <span className="text-lg font-bold">Logo</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden gap-8 md:flex">
          {quickLinks.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname !== link.url && 'text-muted-foreground',
              )}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <AuthButtons />
          <ModeToggle />
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="h-9 w-9 p-0 hover:bg-primary/10">
              <Menu className="!size-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[280px] p-6 sm:w-[320px]">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SheetDescription className="sr-only">
              Use this menu to navigate through different sections of the website
            </SheetDescription>
            <div className="flex flex-col gap-6 py-6">
              <div className="mb-4 flex items-center space-x-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground shadow-sm">
                  L
                </span>
                <span className="text-lg font-bold">Logo</span>
              </div>

              <div className="flex flex-col gap-2">
                {quickLinks.map((link) => (
                  <Link
                    key={link.url}
                    href={link.url}
                    className={cn(
                      'rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-primary/5 hover:text-primary',
                      pathname !== link.url && 'text-muted-foreground',
                    )}>
                    {link.label}
                  </Link>
                ))}
              </div>

              <ModeToggle />

              <div className="mt-4 flex flex-col gap-3 border-t pt-4">
                <AuthButtons />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
