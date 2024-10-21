import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NavLinkEntity } from '@/hooks/use-nav-links';

import { cn } from '@/utils';

import { Button } from '../ui/button';

interface NavLinkProps {
  link: NavLinkEntity;
}

export default function NavLink(props: NavLinkProps) {
  const { link } = props;
  const pathname = usePathname();

  const isActive = pathname === link.url;

  return (
    <Button
      asChild
      variant={isActive ? 'outline' : 'ghost'}
      className="justify-start max-md:border">
      <Link href={link.url} className={cn('block w-full', isActive && 'pointer-events-none')}>
        {link.label}
      </Link>
    </Button>
  );
}
