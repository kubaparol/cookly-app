import Link from "next/link";
import { Button } from "../ui/button";
import Logo from "./Logo";
import { ProjectUrls } from "@/constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="wrapper flex items-center justify-between">
      <Link href={ProjectUrls.home} title="Cookly Home">
        <Logo />
      </Link>

      <SignedIn>
        <div className="flex items-center gap-8">
          <UserButton />

          <Button asChild>
            <Link href={ProjectUrls.dashboard}>Go to panel</Link>
          </Button>
        </div>
      </SignedIn>

      <SignedOut>
        <Button asChild size="lg">
          <Link href={ProjectUrls.signIn}>Login</Link>
        </Button>
      </SignedOut>
    </header>
  );
}
