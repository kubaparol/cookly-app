import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { SidebarItemEntity } from '@/hooks';

import { cn } from '@/utils';

interface AppSidebarItemProps {
  link: SidebarItemEntity;
}

export default function AppSidebarItem(props: AppSidebarItemProps) {
  const { link } = props;
  const pathname = usePathname();

  const isActive = pathname === link.url;

  const contentClassName = cn(
    'flex gap-2 w-full items-center rounded-md bg-gray-50 p-4 text-sm font-medium hover:bg-primary-50',
    isActive && 'pointer-events-none bg-primary-200 text-primary-950',
  );

  const Icon = link.icon;

  const content = (
    <>
      {Icon && <Icon className="size-5" />}
      {link.label}
    </>
  );

  return link.url ? (
    <Link href={link.url} className={contentClassName}>
      {content}
    </Link>
  ) : (
    <button onClick={link.onClick} className={contentClassName}>
      {content}
    </button>
  );
}
