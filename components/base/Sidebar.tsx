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
        "flex flex-col h-full justify-between pt-8 md:pt-0 gap-2",
        className
      )}
    >
      <ul className="grid gap-2">
        {topItems.map((link, index) => (
          <SidebarItem key={index} link={link} onClick={onClose} />
        ))}
      </ul>

      <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>

      <ul className="grid gap-2">
        {bottomItems.map((link, index) => (
          <SidebarItem key={index} link={link} onClick={onClose} />
        ))}
      </ul>
    </nav>
  );
}
