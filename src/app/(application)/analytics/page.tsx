import { BarChart3, Calendar, Download } from 'lucide-react';
import { Metadata } from 'next';

import { ProjectUrls } from '@/constants';

import { PageWrapper } from '@/components/layouts/components/PageWrapper';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const metadata: Metadata = {
  title: 'Analytics',
};

export default function AnalyticsPage() {
  return (
    <PageWrapper
      title="Recipe Analytics"
      description="Track performance and engagement for your recipes"
      breadcrumbs={[
        { href: ProjectUrls.home, label: 'Home' },
        { href: ProjectUrls.analytics, label: 'Analytics', isCurrent: true },
      ]}
      icon={<BarChart3 className="text-muted-foreground" />}
      actions={
        <>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Select defaultValue="30days">
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last 12 months</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </>
      }>
      <div className="grid grid-cols-1 gap-4">xD</div>
    </PageWrapper>
  );
}
