import { ComponentPropsWithoutRef } from 'react';

import { NavLinkEntity } from '@/hooks/use-nav-links';

import { cn } from '@/utils';

import NavLink from './NavLink';

export interface NavbarProps extends ComponentPropsWithoutRef<'nav'> {
  links: NavLinkEntity[];
  onClose?: () => void;
}

export default function Navbar(props: NavbarProps) {
  const { links, onClose, className, ...rest } = props;

  return (
    <nav {...rest} className={cn('', className)}>
      <ul className="flex flex-col gap-2 md:flex-row md:gap-8">
        {links.map((link, index) => (
          <li key={index}>
            <NavLink link={link} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
