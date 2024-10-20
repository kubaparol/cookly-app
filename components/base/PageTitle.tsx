'use client';

import { usePathname } from 'next/navigation';

import { ProjectUrlType, appPageTitles, libreBaskerville } from '@/constants';

interface PageTitleProps {
  custom?: string;
}

export default function PageTitle(props: PageTitleProps) {
  const { custom } = props;

  const pathname = usePathname();

  let title = custom ?? appPageTitles[pathname as ProjectUrlType];

  if (!title) return null;

  return <h1 className={`${libreBaskerville.className} text-xl md:py-3 md:text-2xl`}>{title}</h1>;
}
