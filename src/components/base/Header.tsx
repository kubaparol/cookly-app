'use client';

import { SignOutButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { useNavLinks } from '@/hooks/use-nav-links';

import { ProjectUrls } from '@/constants';

import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import Logo from './Logo';
import Navbar from './Navbar';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const { quickLinks } = useNavLinks();

  const AuthButtons = (
    <>
      <SignedIn>
        <div className="grid grid-cols-[1fr,_1fr] items-center gap-4 md:flex">
          <Button asChild>
            <Link href={ProjectUrls.dashboard} onClick={() => setIsOpen(false)}>
              Dashboard
            </Link>
          </Button>

          <SignOutButton>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Sign Out
            </Button>
          </SignOutButton>
        </div>
      </SignedIn>

      <SignedOut>
        <Button asChild className="w-full md:w-fit">
          <Link href={ProjectUrls.signIn} onClick={() => setIsOpen(false)}>
            Login
          </Link>
        </Button>
      </SignedOut>
    </>
  );

  return (
    <header className="fixed z-10 w-full bg-primary-50 shadow-md backdrop-blur-lg">
      <div className="wrapper flex items-center justify-between">
        <Link href={ProjectUrls.home} title="Cookly Home">
          <Logo className="max-w-[110px]" />
        </Link>

        <div className="hidden md:block">
          <Navbar links={quickLinks} onClose={() => setIsOpen(false)} />
        </div>

        <div className="hidden md:block">{AuthButtons}</div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="ml-auto md:hidden">
            <Menu aria-label={isOpen ? 'close menu' : 'open menu'} />
          </SheetTrigger>

          <SheetContent side="right" className="w-full xs:w-3/4">
            <div className="mt-8 grid gap-6">
              {AuthButtons}

              <Navbar links={quickLinks} onClose={() => setIsOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
