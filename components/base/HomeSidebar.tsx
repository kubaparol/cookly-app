import { ComponentPropsWithoutRef } from 'react';

import { SidebarItemEntity } from '@/hooks';

import { cn } from '@/utils';

import SidebarItem from './SidebarItem';

export interface HomeSidebarProps extends ComponentPropsWithoutRef<'nav'> {
  items: SidebarItemEntity[];
  onClose?: () => void;
}

export default function HomeSidebar(props: HomeSidebarProps) {
  const { items, onClose, className, ...rest } = props;

  return (
    <nav {...rest} className={cn('', className)}>
      <ul className="flex flex-col gap-2 md:flex-row md:gap-8">
        {items.map((link, index) => (
          <li key={index}>
            <SidebarItem design="link" link={link} onClick={onClose} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
