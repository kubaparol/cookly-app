import PageTitle from "@/components/base/PageTitle";
import RecipeForm from "@/components/forms/RecipeForm";
import { appPageTitles, ProjectUrls } from "@/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: appPageTitles[ProjectUrls.createRecipe],
};

export default function CreateRecipePage() {
  return (
    <section className="grid gap-6">
      <PageTitle />

      <RecipeForm type="Create" />
    </section>
  );
}
