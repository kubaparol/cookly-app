import { Button } from "@/components/ui/button";
import { appPageTitles, ProjectUrls } from "@/constants";
import { PlusIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: appPageTitles[ProjectUrls.recipes],
};

export default function RecipesPage() {
  return (
    <section>
      <Button asChild className="ml-auto">
        <Link href={ProjectUrls.createRecipe} className="gap-3">
          Create Recipe
          <PlusIcon className="size-5" />
        </Link>
      </Button>
    </section>
  );
}
