"use client";

import { ReactNode, useState } from "react";
import { useSidebarItems } from "@/hooks";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { ProjectUrls } from "@/constants/urls";
import Logo from "../base/Logo";
import Sidebar from "../base/Sidebar";

interface AppLayoutProps {
  readonly children: ReactNode;
}

export default function AppLayout(props: AppLayoutProps) {
  const { children } = props;
  const [isOpen, setIsOpen] = useState(false);

  const { topItems, bottomItems } = useSidebarItems();

  return (
    <>
      <div className="border-b flex justify-between py-2 px-6 md:hidden">
        <Link href={ProjectUrls.home} title="Cookly Home">
          <Logo className="max-w-[100px]" />
        </Link>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger className="md:hidden ml-auto">
            <Menu />
          </SheetTrigger>

          <SheetContent side="right">
            <Sidebar
              topItems={topItems}
              bottomItems={bottomItems}
              onClose={() => setIsOpen(false)}
            />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex">
        <div className="hidden md:flex flex-col bg-[#fefae8] md:w-64">
          <Link
            href={ProjectUrls.home}
            title="Cookly Home"
            className="grid place-items-center p-4"
          >
            <Logo className="max-w-[140px]" />
          </Link>

          <Sidebar
            topItems={topItems}
            bottomItems={bottomItems}
            onClose={() => setIsOpen(false)}
            className="hidden md:grid flex-1"
          />
        </div>

        <div className="min-h-[calc(100vh-(56px))] md:min-h-[calc(100vh)] px-3 py-4 sm:px-6 flex-1">
          {children}
        </div>
      </div>
    </>
  );
}
