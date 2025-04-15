import { MessageCircle } from 'lucide-react';
import { Metadata } from 'next';

import { ProjectUrls } from '@/constants';

import { PageWrapper } from '@/components/layouts/components/PageWrapper';

import { PageProps } from '@/types';

import CommentsReceivedPage from './CommentsReceivedPage';

export const metadata: Metadata = {
  title: 'Comments Received',
};

export default function Page(props: PageProps) {
  return (
    <PageWrapper
      title="Comments Received"
      description="Manage comments on your recipes and track your feedback"
      breadcrumbs={[
        { href: ProjectUrls.home, label: 'Home' },
        { href: ProjectUrls.commentsReceived, label: 'Comments Received', isCurrent: true },
      ]}
      icon={<MessageCircle className="text-muted-foreground" />}>
      <CommentsReceivedPage {...props} />
    </PageWrapper>
  );
}
