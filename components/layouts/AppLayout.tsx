'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { ReactNode, useState } from 'react';

import { useSidebarItems } from '@/hooks';

import { ProjectUrls } from '@/constants/urls';

import AppSidebar from '../base/AppSidebar';
import Logo from '../base/Logo';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

interface AppLayoutProps {
  readonly children: ReactNode;
}

export default function AppLayout(props: AppLayoutProps) {
  const { children } = props;
  const [isOpen, setIsOpen] = useState(false);

  const { appTopItems, appBottomItems } = useSidebarItems();

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

          <SheetContent side="right" className="xxs:w-3/4 w-full">
            <AppSidebar
              topItems={appTopItems}
              bottomItems={appBottomItems}
              onClose={() => setIsOpen(false)}
            />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex h-screen overflow-hidden">
        <div className="hidden w-full flex-col px-3 py-4 md:flex md:w-64 md:px-2">
          <Link
            href={ProjectUrls.home}
            title="Cookly Home"
            className="mb-2 grid place-items-center rounded-md bg-primary-100 p-4">
            <Logo className="max-w-[140px]" />
          </Link>

          <AppSidebar
            topItems={appTopItems}
            bottomItems={appBottomItems}
            onClose={() => setIsOpen(false)}
          />
        </div>

        <div className="min-h-[calc(100vh-(56px))] flex-1 overflow-y-scroll px-3 py-4 sm:px-6 md:min-h-[calc(100vh)]">
          {children}
        </div>
      </div>
    </>
  );
}
