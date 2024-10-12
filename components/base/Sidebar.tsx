import { SidebarItemEntity } from "@/hooks";
import { cn } from "@/utils";
import { ComponentPropsWithoutRef } from "react";
import { Separator } from "../ui/separator";
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
        "p-4 bg-background grid md:border-r h-full md:h-auto",
        className
      )}
    >
      <ul className="grid gap-2 h-fit">
        {topItems.map((link, index) => (
          <SidebarItem key={index} link={link} onClick={onClose} />
        ))}
      </ul>

      <div className="mt-auto">
        <Separator className="my-2" />

        <ul className="grid gap-2">
          {bottomItems.map((link, index) => (
            <SidebarItem key={index} link={link} onClick={onClose} />
          ))}
        </ul>
      </div>
    </nav>
  );
}
