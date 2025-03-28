import { ReactNode } from 'react';

import { SidebarInset, SidebarProvider } from '../ui/sidebar';
import { AppSidebar } from './components/AppSidebar';
import { SiteHeader } from './components/SiteHeader';

interface AppLayoutProps {
  readonly children: ReactNode;
}

export default function AppLayout(props: AppLayoutProps) {
  const { children } = props;

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />

      <SidebarInset>
        <SiteHeader />

        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
