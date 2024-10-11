import { ComponentType, useMemo } from "react";
import { Home, LucideProps, PowerIcon, ScrollText } from "lucide-react";
import { usePathname } from "next/navigation";
import { ProjectUrls } from "@/constants/urls";
import { useClerk } from "@clerk/nextjs";

export interface SidebarItemEntity {
  label: string;
  url?: string;
  onClick?: () => void;
  icon: ComponentType<LucideProps>;
}

export const useSidebarItems = () => {
  const pathname = usePathname();
  const { signOut } = useClerk();

  const topItems = useMemo<SidebarItemEntity[]>(
    () => [
      {
        label: "Dashboard",
        url: ProjectUrls.dashboard,
        icon: Home,
      },
      {
        label: "Recipes",
        url: ProjectUrls.recipes,
        icon: ScrollText,
      },
    ],
    []
  );

  const bottomItems = useMemo<SidebarItemEntity[]>(
    () => [
      {
        label: "Sign Out",
        onClick: () => signOut({ redirectUrl: ProjectUrls.home }),
        icon: PowerIcon,
      },
    ],
    [signOut]
  );

  const currentItem = useMemo(() => {
    return [...topItems, ...bottomItems].find((item) => item?.url === pathname);
  }, [bottomItems, pathname, topItems]);

  return { topItems, bottomItems, currentItem };
};
