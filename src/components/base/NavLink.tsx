import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NavLinkEntity } from '@/hooks';

import { cn } from '@/utils';

interface NavLinkProps {
  link: NavLinkEntity;
}

export default function NavLink(props: NavLinkProps) {
  const { link } = props;
  const pathname = usePathname();

  const isActive = pathname === link.url;

  return (
    <Link
      href={link.url}
      className={cn(
        "relative block w-fit after:absolute after:block after:h-[3px] after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition after:duration-300 after:content-[''] after:hover:scale-x-100",
        isActive && 'pointer-events-none after:scale-x-100',
      )}>
      {link.label}
    </Link>
  );
}
