import { Metadata } from 'next';

import { PageProps } from '@/types';

import CommentsReceivedPage from './CommentsReceivedPage';

export const metadata: Metadata = {
  title: 'Comments Received',
};

export default function Page(props: PageProps) {
  return <CommentsReceivedPage {...props} />;
}
