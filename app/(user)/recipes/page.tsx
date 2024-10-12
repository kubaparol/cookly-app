import PageTitle from "@/components/base/PageTitle";
import { Button } from "@/components/ui/button";
import { ProjectUrls } from "@/constants";
import { PlusIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Recipes",
};

export default function RecipesPage() {
  return (
    <section>
      <header className="flex items-center justify-between">
        <PageTitle title="Recipes" />

        <Button asChild>
          <Link href={ProjectUrls.createRecipe} className="gap-3">
            Create Recipe
            <PlusIcon className="size-5" />
          </Link>
        </Button>
      </header>
    </section>
  );
}
