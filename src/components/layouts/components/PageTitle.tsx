'use client';

import { usePathname } from 'next/navigation';

import { getPageTitle } from '@/constants';

interface PageTitleProps {
  readonly title?: string;
}

export function PageTitle({ title }: PageTitleProps) {
  const pathname = usePathname();
  const pageTitle = title || getPageTitle(pathname);

  return <>{pageTitle}</>;
}
