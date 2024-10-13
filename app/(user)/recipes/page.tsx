import Search from "@/components/base/Search";
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
    <section className="grid gap-24">
      <header className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-8">
        <Search placeholder="Search recipes..." />

        <Button asChild className="w-full sm:w-fit">
          <Link href={ProjectUrls.createRecipe} className="gap-3">
            Create Recipe
            <PlusIcon className="size-5" />
          </Link>
        </Button>
      </header>

      <div className="grid gap-10">
        {/* <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-x-8 gap-y-16">
          {[].map((m) => (
            <li key={m.id} className="bg-muted rounded-xl">
              <header className="pb-2 grid gap-6">
                <Image
                  src={m.image}
                  width={150}
                  height={150}
                  alt={`${m.name} picture`}
                  className="rounded-full -mt-12 mx-auto border-2 shadow-xl"
                />
                <p className="text-center font-bold">{m.name}</p>
              </header>

              <Separator />

              <footer className="flex items-center justify-between p-3">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock9 className="size-4" />
                  <p className="text-xs font-medium">{m.cookTime} minutes</p>
                </div>
                <Button size="sm">View recipe</Button>
              </footer>
            </li>
          ))}
        </ul> */}

        {/* <Pagination totalPages={10} className="mx-auto" /> */}
      </div>
    </section>
  );
}
