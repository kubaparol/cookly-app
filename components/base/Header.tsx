'use client';

import { SignOutButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { ChevronRight, Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { useSidebarItems } from '@/hooks';

import { ProjectUrls } from '@/constants';

import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import HomeSidebar from './HomeSidebar';
import Logo from './Logo';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const { homeItems } = useSidebarItems();

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
    <header className="wrapper flex items-center justify-between">
      <Link href={ProjectUrls.home} title="Cookly Home">
        <Logo className="max-w-[110px]" />
      </Link>

      <div className="hidden md:block">
        <HomeSidebar items={homeItems} onClick={() => setIsOpen(false)} />
      </div>

      <div className="hidden md:block">{AuthButtons}</div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger className="ml-auto md:hidden">
          <Menu />
        </SheetTrigger>

        <SheetContent side="right" className="xs:w-3/4 w-full">
          <div className="mt-8 grid gap-6">
            {AuthButtons}

            <HomeSidebar items={homeItems} onClick={() => setIsOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
