import { SignOutButton, SignedIn, SignedOut } from '@clerk/nextjs';
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
          <Button asChild>
            <Link href={ProjectUrls.dashboard}>Go to dashboard</Link>
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
