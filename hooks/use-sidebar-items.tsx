import { useMemo } from "react";
import { Home } from "lucide-react";
import { usePathname } from "next/navigation";
import { ProjectUrls } from "@/constants/urls";

export interface SidebarItemEntity {
  label: string;
  url?: string;
  onClick?: () => void;
  icon: JSX.Element;
}

export const useSidebarItems = () => {
  const pathname = usePathname();

  const topItems = useMemo<SidebarItemEntity[]>(
    () => [
      {
        label: "Dashboard",
        url: ProjectUrls.dashboard,
        icon: <Home />,
      },
    ],
    []
  );

  const bottomItems = useMemo<SidebarItemEntity[]>(() => [], []);

  const currentItem = useMemo(() => {
    return [...topItems, ...bottomItems].find((item) => item?.url === pathname);
  }, [bottomItems, pathname, topItems]);

  return { topItems, bottomItems, currentItem };
};
