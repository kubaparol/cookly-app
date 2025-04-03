import { MessageCircle } from 'lucide-react';
import { Metadata } from 'next';

import { ProjectUrls } from '@/constants';

import { PageWrapper } from '@/components/layouts/components/PageWrapper';

import { PageProps } from '@/types';

import CommentsMadePage from './CommentsMadePage';

export const metadata: Metadata = {
  title: 'Comments Made',
};

export default function Page(props: PageProps) {
  return (
    <PageWrapper
      title="Comments Made"
      description="Manage comments on your recipes and track your feedback"
      breadcrumbs={[
        { href: ProjectUrls.home, label: 'Home' },
        { href: ProjectUrls.commentsMade, label: 'Comments Made', isCurrent: true },
      ]}
      icon={<MessageCircle className="text-muted-foreground" />}>
      <CommentsMadePage {...props} />
    </PageWrapper>
  );
}
