'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { ReactNode, useState } from 'react';

import { useAppSidebarItems } from '@/hooks';

import { ProjectUrls } from '@/constants/urls';

import AppSidebar from '../base/AppSidebar';
import Logo from '../base/Logo';
import UserPreviewContainer from '../containers/UserPreviewContainer';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

interface AppLayoutProps {
  readonly children: ReactNode;
}

export default function AppLayout(props: AppLayoutProps) {
  const { children } = props;
  const [isOpen, setIsOpen] = useState(false);

  const { topItems, bottomItems } = useAppSidebarItems();

  return (
    <>
      <div className="flex justify-between border-b px-6 py-2 md:hidden">
        <Link href={ProjectUrls.home} title="Cookly Home">
          <Logo className="max-w-[100px]" />
        </Link>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="ml-auto md:hidden">
            <Menu />
          </SheetTrigger>

          <SheetContent side="right" className="flex h-full w-full flex-col xxs:w-3/4">
            <AppSidebar
              topItems={topItems}
              bottomItems={bottomItems}
              onClose={() => setIsOpen(false)}
            />

            <UserPreviewContainer />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex h-screen overflow-hidden">
        <div className="hidden w-full flex-col gap-2 px-3 py-4 md:flex md:w-64 md:px-2">
          <Link
            href={ProjectUrls.home}
            title="Cookly Home"
            className="grid place-items-center rounded-md bg-primary-100 p-4">
            <Logo className="max-w-[140px]" />
          </Link>

          <AppSidebar
            topItems={topItems}
            bottomItems={bottomItems}
            onClose={() => setIsOpen(false)}
          />

          <UserPreviewContainer />
        </div>

        <div className="min-h-[calc(100vh-(56px))] flex-1 overflow-y-scroll px-3 py-4 sm:px-6 md:min-h-[calc(100vh)]">
          {children}
        </div>
      </div>
    </>
  );
}
