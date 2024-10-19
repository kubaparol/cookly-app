import { SidebarItemEntity } from "@/hooks";
import { usePathname } from "next/navigation";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/utils";
import Link from "next/link";

interface SidebarItemProps extends ComponentPropsWithoutRef<"li"> {
  link: SidebarItemEntity;
}

export default function SidebarItem(props: SidebarItemProps) {
  const { link, className, ...rest } = props;
  const pathname = usePathname();

  const isActive = pathname === link.url;

  const contentClassName = cn(
    "flex gap-2 w-full items-center rounded-md bg-gray-50 p-4 text-sm font-medium hover:bg-primary-50",
    isActive && "pointer-events-none bg-primary-200 text-primary-950"
  );

  const Icon = link.icon;

  const content = (
    <>
      <Icon className="size-5" />
      {link.label}
    </>
  );

  return (
    <li {...rest} className={cn("", className)}>
      {link.url ? (
        <Link href={link.url} className={contentClassName}>
          {content}
        </Link>
      ) : (
        <button onClick={link.onClick} className={contentClassName}>
          {content}
        </button>
      )}
    </li>
  );
}
