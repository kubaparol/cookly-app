'use client';

import { usePathname } from 'next/navigation';

import { ProjectUrlType, appPageTitles, libreBaskerville } from '@/constants';

export default function PageTitle() {
  const pathname = usePathname();

  const title = appPageTitles[pathname as ProjectUrlType];

  if (!title) return null;

  return <h1 className={`${libreBaskerville.className} text-xl md:py-3 md:text-2xl`}>{title}</h1>;
}
