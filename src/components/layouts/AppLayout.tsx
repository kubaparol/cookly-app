'use client';

import { ReactNode } from 'react';

import { SidebarInset, SidebarProvider } from '../ui/sidebar';
import { AppSidebar } from './components/AppSidebar';
import { PageTitle } from './components/PageTitle';
import { SiteHeader } from './components/SiteHeader';

interface AppLayoutProps {
  readonly children: ReactNode;
  readonly title?: string;
}

export default function AppLayout(props: AppLayoutProps) {
  const { children, title } = props;

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader>
          <PageTitle title={title} />
        </SiteHeader>

        <div className="flex-1 px-4 py-4 md:gap-6 md:py-6 lg:px-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
