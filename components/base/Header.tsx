import { SignOutButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import { ProjectUrls } from '@/constants';

import { Button } from '../ui/button';
import Logo from './Logo';

export default function Header() {
  return (
    <header className="wrapper flex items-center justify-between">
      <Link href={ProjectUrls.home} title="Cookly Home">
        <Logo />
      </Link>

      <SignedIn>
        <div className="flex items-center gap-4">
          <Button asChild className="group">
            <Link href={ProjectUrls.dashboard}>
              Dashboard
              <ChevronRight className="ml-1 size-4 transition-all group-hover:ml-2" />
            </Link>
          </Button>

          <SignOutButton>
            <Button variant="outline">Sign Out</Button>
          </SignOutButton>
        </div>
      </SignedIn>

      <SignedOut>
        <Button asChild>
          <Link href={ProjectUrls.signIn}>Login</Link>
        </Button>
      </SignedOut>
    </header>
  );
}
