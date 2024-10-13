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
    variant: isActive ? "default" : "ghost",
    className: cn(
      "w-full gap-2 justify-start rounded-sm text-center min-w-44",
      isActive && "pointer-events-none bg-primary/35"
    ),
  };

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
