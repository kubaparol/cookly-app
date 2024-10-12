import PageTitle from "@/components/base/PageTitle";
import { Button } from "@/components/ui/button";
import { ProjectUrls } from "@/constants";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create Recipe",
};

export default function CreateRecipePage() {
  return (
    <section>
      <header className="grid gap-2 w-fit">
        <Button asChild variant="link">
          <Link href={ProjectUrls.recipes} className="gap-3 px-0">
            <ArrowLeft className="size-5" />
            Back to recipes
          </Link>
        </Button>

        <PageTitle title="Create Recipe" />
      </header>
    </section>
  );
}
