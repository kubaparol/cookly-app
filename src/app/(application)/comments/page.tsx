import { Metadata } from 'next';

import { PageProps } from '@/types';

import CommentsPage from './CommentsPage';

export const metadata: Metadata = {
  title: 'Comments',
};

export default function Page({ searchParams }: PageProps) {
  return <CommentsPage searchParams={searchParams} />;
}
