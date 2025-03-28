'use client';

import { SignOutButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';

import { ProjectUrls } from '@/constants';

import { Button } from '../ui/button';

export default function Header() {
  return (
    <header>
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
    </header>
  );
}
