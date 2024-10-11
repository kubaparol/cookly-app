import { SidebarItemEntity } from "@/hooks";
import { usePathname } from "next/navigation";
import { ComponentPropsWithoutRef } from "react";
import { Button, ButtonProps } from "../ui/button";
import { cn } from "@/utils";
import Link from "next/link";

interface SidebarItemProps extends ComponentPropsWithoutRef<"li"> {
  link: SidebarItemEntity;
}

export default function SidebarItem(props: SidebarItemProps) {
  const { link, className, ...rest } = props;
  const pathname = usePathname();

  const isActive = pathname === link.url;

  const commonProps: ButtonProps = {
    size: "lg",
    variant: isActive ? "default" : "ghost",
    className: cn(
      "w-full gap-4 justify-start rounded-sm text-center justify-center min-w-44",
      isActive && "pointer-events-none"
    ),
  };

  const content = (
    <>
      {link.icon}
      {link.label}
    </>
  );

  return (
    <li {...rest} className={cn("", className)}>
      {link.url ? (
        <Button asChild {...commonProps}>
          <Link href={link.url}>{content}</Link>
        </Button>
      ) : (
        <Button onClick={link.onClick} {...commonProps}>
          {content}
        </Button>
      )}
    </li>
  );
}
