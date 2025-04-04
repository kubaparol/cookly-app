import { LayoutDashboardIcon, Plus, Search } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

import { ProjectUrls } from '@/constants';

import { PageWrapper } from '@/components/layouts/components/PageWrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import QuickStats from './QuickStats';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardPage() {
  return (
    <PageWrapper
      title="Hello, John!"
      description="Welcome to your Recipe Hub dashboard"
      icon={<LayoutDashboardIcon className="text-muted-foreground" />}
      actions={
        <div className="flex gap-2 md:flex-col lg:flex-row">
          <Button variant="outline" asChild>
            <Link href={ProjectUrls.recipes}>
              <Search className="mr-2 h-4 w-4" />
              Browse Recipes
            </Link>
          </Button>

          <Button asChild>
            <Link href={ProjectUrls.createRecipe}>
              <Plus className="mr-2 h-4 w-4" />
              Create Recipe
            </Link>
          </Button>
        </div>
      }>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Your Cooking Stats</CardTitle>
          <CardDescription>Overview of your cooking activity</CardDescription>
        </CardHeader>
        <CardContent>
          <QuickStats />
        </CardContent>
      </Card>
    </PageWrapper>
  );
}
