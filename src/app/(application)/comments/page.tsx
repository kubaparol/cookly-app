import { Metadata } from 'next';

import CommentsPage from './CommentsPage';

export const metadata: Metadata = {
  title: 'Comments',
};

export default function Page() {
  return <CommentsPage />;
}
