import Link from "next/link";
import { Button } from "../ui/button";
import Logo from "./Logo";
import { ProjectUrls } from "@/constants";

export default function Header() {
  return (
    <header className="wrapper flex items-center justify-between">
      <Link href={ProjectUrls.home} title="Cookly Home">
        <Logo />
      </Link>

      <Button size="lg">Login</Button>
    </header>
  );
}
