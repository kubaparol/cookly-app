import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SidebarItemEntity } from '@/hooks';

import { cn } from '@/utils';

interface SidebarItemProps {
  design: 'link' | 'button';
  link: SidebarItemEntity;
  onClick?: () => void;
}

export default function SidebarItem(props: SidebarItemProps) {
  const { link, design } = props;
  const pathname = usePathname();

  const isActive = pathname === link.url;

  const Icon = link.icon;

  const content = (
    <>
      {Icon && <Icon className="size-5" />}
      {link.label}
    </>
  );

  return (
    <>
      {link.url ? (
        <Link
          href={link.url}
          className={cn(
            'w-full rounded-md px-3 py-1 transition-all duration-300 ease-in-out hover:bg-primary/30',
            isActive && design === 'link' && 'bg-primary/30',
          )}>
          {content}
        </Link>
      ) : (
        <button
          onClick={link.onClick}
          className={cn(
            'flex w-full items-center gap-2 rounded-md bg-gray-50 p-4 text-sm font-medium hover:bg-primary-50',
            isActive &&
              design === 'button' &&
              'pointer-events-none bg-primary-200 text-primary-950',
          )}>
          {content}
        </button>
      )}
    </>
  );
}
