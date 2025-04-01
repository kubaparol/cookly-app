import { Metadata } from 'next';

import { PageProps } from '@/types';

import CommentsMadePage from './CommentsMadePage';

export const metadata: Metadata = {
  title: 'Comments Made',
};

export default function Page(props: PageProps) {
  return <CommentsMadePage {...props} />;
}
