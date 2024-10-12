import { appPageTitles, ProjectUrlType } from "@/constants";
import { usePathname } from "next/navigation";

export default function PageTitle() {
  const pathname = usePathname();

  const title = appPageTitles[pathname as ProjectUrlType];

  if (!title) return null;

  return <h1 className="text-xl md:text-2xl pl-3 hidden md:block">{title}</h1>;
}
