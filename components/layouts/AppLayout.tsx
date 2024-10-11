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
      <header className="border-b">
        <div className="wrapper !max-w-full flex items-center gap-4 justify-between">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="md:hidden">
              <Menu />
            </SheetTrigger>

            <SheetContent side="left">
              <Sidebar
                topItems={topItems}
                bottomItems={bottomItems}
                onClose={() => setIsOpen(false)}
              />
            </SheetContent>
          </Sheet>

          <Link href={ProjectUrls.home} title="Cookly Home">
            <Logo />
          </Link>

          {/* <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn> */}
        </div>
      </header>

      <main className="flex md:min-h-[calc(100vh-(68px+1px))] min-h-[calc(100vh-(64px+1px))]">
        <Sidebar
          topItems={topItems}
          bottomItems={bottomItems}
          onClose={() => setIsOpen(false)}
          className="hidden md:grid"
        />

        <div className="wrapper !m-0 !mx-auto">{children}</div>
      </main>
    </>
  );
}
