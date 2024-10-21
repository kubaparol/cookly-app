import { ComponentPropsWithoutRef } from 'react';

import { SidebarItemEntity } from '@/hooks';

import { cn } from '@/utils';

import SidebarItem from './SidebarItem';

export interface AppSidebarProps extends ComponentPropsWithoutRef<'nav'> {
  topItems: SidebarItemEntity[];
  bottomItems: SidebarItemEntity[];
  onClose?: () => void;
}

export default function AppSidebar(props: AppSidebarProps) {
  const { topItems, bottomItems, onClose, className, ...rest } = props;

  return (
    <nav
      {...rest}
      className={cn('flex h-full flex-col justify-between gap-2 pt-8 md:pt-0', className)}>
      <ul className="grid gap-2">
        {topItems.map((link, index) => (
          <li key={index}>
            <SidebarItem design="button" link={link} onClick={onClose} />
          </li>
        ))}
      </ul>

      <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>

      <ul className="grid gap-2">
        {bottomItems.map((link, index) => (
          <li key={index}>
            <SidebarItem design="button" link={link} onClick={onClose} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
