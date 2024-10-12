import RecipeForm from "@/components/forms/RecipeForm";
import { Button } from "@/components/ui/button";
import { appPageTitles, ProjectUrls } from "@/constants";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: appPageTitles[ProjectUrls.createRecipe],
};

export default function CreateRecipePage() {
  return (
    <section className="grid gap-6">
      <Button asChild variant="link" className="w-fit">
        <Link href={ProjectUrls.recipes} className="gap-3 px-0">
          <ArrowLeft className="size-5" />
          Back to recipes
        </Link>
      </Button>

      <RecipeForm type="Create" />
    </section>
  );
}
