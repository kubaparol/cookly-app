import { BarChart3, Heart, LayoutDashboardIcon, Plus, ScrollText, Search } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

import { ProjectUrls } from '@/constants';

import { PageWrapper } from '@/components/layouts/components/PageWrapper';
import { QuickActionCard } from '@/components/modules/dashboard/QuickActionCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import QuickStats from './QuickStats';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardPage() {
  return (
    <PageWrapper
      title="Dashboard"
      description="Welcome to your Cookly dashboard"
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
      <div className="grid gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Your Cooking Stats</CardTitle>
            <CardDescription>Overview of your cooking activity</CardDescription>
          </CardHeader>
          <CardContent>
            <QuickStats />
          </CardContent>
        </Card>

        <div className="grid gap-4 xxs:grid-cols-2 xs:grid-cols-3">
          <QuickActionCard
            title="My Recipes"
            icon={<ScrollText className="h-5 w-5" />}
            description="View and manage your recipes"
            href="/dashboard/my-recipes"
          />
          <QuickActionCard
            title="Saved Recipes"
            icon={<Heart className="h-5 w-5" />}
            description="Access your favorite recipes"
            href="/dashboard/saved"
          />
          <QuickActionCard
            title="Analytics"
            icon={<BarChart3 className="h-5 w-5" />}
            description="Track recipe performance"
            href="/dashboard/analytics"
            className="xxs:col-span-full xs:col-span-1"
          />
        </div>
      </div>
    </PageWrapper>
  );
}
