import { Metadata } from 'next';

import { ProjectUrls, appPageTitles } from '@/constants';

import PageTitle from '@/components/base/PageTitle';

export const metadata: Metadata = {
  title: appPageTitles[ProjectUrls.dashboard],
};

export default function DashboardPage() {
  return (
    <section>
      <PageTitle />
    </section>
  );
}
