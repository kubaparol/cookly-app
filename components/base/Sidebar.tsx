import { SidebarItemEntity } from "@/hooks";
import { cn } from "@/utils";
import { ComponentPropsWithoutRef } from "react";
import SidebarItem from "./SidebarItem";

export interface SidebarProps extends ComponentPropsWithoutRef<"nav"> {
  topItems: SidebarItemEntity[];
  bottomItems: SidebarItemEntity[];
  onClose?: () => void;
}

export default function Sidebar(props: SidebarProps) {
  const { topItems, bottomItems, onClose, className, ...rest } = props;

  return (
    <nav
      {...rest}
      className={cn(
        "md:p-2 grid grid-rows-[1fr,_auto] h-full gap-2 pb-2",
        className
      )}
    >
      <ul className="p-4 flex flex-col gap-2 h-full">
        {topItems.map((link, index) => (
          <SidebarItem key={index} link={link} onClick={onClose} />
        ))}
      </ul>

      <ul className="p-4 grid gap-2 h-fit">
        {bottomItems.map((link, index) => (
          <SidebarItem key={index} link={link} onClick={onClose} />
        ))}
      </ul>
    </nav>
  );
}
