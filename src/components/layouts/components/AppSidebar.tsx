'use client';

import { useClerk, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import * as React from 'react';

import { useAppSidebarItems } from '@/hooks';

import { ProjectUrls } from '@/constants';

import { Logo } from '@/components/base/Logo';
import { NavMain } from '@/components/layouts/components/NavMain';
import { NavSecondary } from '@/components/layouts/components/NavSecondary';
import { NavUser } from '@/components/layouts/components/NavUser';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { main, secondary } = useAppSidebarItems();

  const { signOut } = useClerk();
  const { user } = useUser();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="h-12 w-fit py-4 data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href={ProjectUrls.home} title="Cookly Home">
                <Logo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={main} />
        <NavSecondary items={secondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            // name: user?.fullName || '',
            // email: user?.emailAddresses?.[0]?.emailAddress || '',
            name: 'John Doe',
            email: 'john.doe@example.com',
            avatar: user?.imageUrl || '',
          }}
          onSignOut={signOut}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
