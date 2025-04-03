import { Download, LayoutDashboardIcon } from 'lucide-react';
import { Metadata } from 'next';

import { ProjectUrls } from '@/constants';

import { PageWrapper } from '@/components/layouts/components/PageWrapper';
import { Button } from '@/components/ui/button';

import StatisticCards from './StatisticCards';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardPage() {
  return (
    <PageWrapper
      title="Dashboard"
      description="Welcome to your dashboard. Here you can see your statistics and manage your account."
      breadcrumbs={[
        { href: ProjectUrls.home, label: 'Home' },
        { href: ProjectUrls.dashboard, label: 'Dashboard', isCurrent: true },
      ]}
      icon={<LayoutDashboardIcon className="text-muted-foreground" />}
      actions={
        <Button size="sm" variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      }>
      <div className="grid grid-cols-1 gap-4">
        <StatisticCards />
      </div>
    </PageWrapper>
  );
}
