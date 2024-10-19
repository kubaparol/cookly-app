"use client";

import { appPageTitles, libreBaskerville, ProjectUrlType } from "@/constants";
import { usePathname } from "next/navigation";

export default function PageTitle() {
  const pathname = usePathname();

  const title = appPageTitles[pathname as ProjectUrlType];

  if (!title) return null;

  return (
    <h1 className={`${libreBaskerville.className} text-xl md:text-2xl md:py-3`}>
      {title}
    </h1>
  );
}
