import Pagination from "@/components/base/Pagination";
import Search from "@/components/base/Search";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { appPageTitles, ProjectUrls } from "@/constants";
import { Clock9, PlusIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
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
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-x-8 gap-y-16">
          {mock.map((m) => (
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
        </ul>

        <Pagination totalPages={10} className="mx-auto" />
      </div>
    </section>
  );
}

const mock = [
  {
    id: 1,
    name: "Special Salad Chicken",
    image: "https://picsum.photos/id/112/400",
    rating: {
      value: Math.floor(Math.random() * 5) + 1,
      count: Math.floor(Math.random() * 100),
    },
    cookTime: Math.floor(Math.random() * 60),
  },
  {
    id: 2,
    name: "Noodle Chicken",
    image: "https://picsum.photos/id/222/400",
    rating: {
      value: Math.floor(Math.random() * 5) + 1,
      count: Math.floor(Math.random() * 100),
    },
    cookTime: Math.floor(Math.random() * 60),
  },
  {
    id: 3,
    name: "Special Salad Chicken",
    image: "https://picsum.photos/id/331/400",
    rating: {
      value: Math.floor(Math.random() * 5) + 1,
      count: Math.floor(Math.random() * 100),
    },
    cookTime: Math.floor(Math.random() * 60),
  },
  {
    id: 4,
    name: "Special Salad Chicken",
    image: "https://picsum.photos/id/234/400",
    rating: {
      value: Math.floor(Math.random() * 5) + 1,
      count: Math.floor(Math.random() * 100),
    },
    cookTime: Math.floor(Math.random() * 60),
  },
  {
    id: 5,
    name: "Special Salad Chicken",
    image: "https://picsum.photos/id/985/400",
    rating: {
      value: Math.floor(Math.random() * 5) + 1,
      count: Math.floor(Math.random() * 100),
    },
    cookTime: Math.floor(Math.random() * 60),
  },
  {
    id: 6,
    name: "Special Salad Chicken",
    image: "https://picsum.photos/id/26/400",
    rating: {
      value: Math.floor(Math.random() * 5) + 1,
      count: Math.floor(Math.random() * 100),
    },
    cookTime: Math.floor(Math.random() * 60),
  },
  {
    id: 7,
    name: "Special Salad Chicken",
    image: "https://picsum.photos/id/71/400",
    rating: {
      value: Math.floor(Math.random() * 5) + 1,
      count: Math.floor(Math.random() * 100),
    },
    cookTime: Math.floor(Math.random() * 60),
  },
  {
    id: 8,
    name: "Special Salad Chicken",
    image: "https://picsum.photos/id/84/400",
    rating: {
      value: Math.floor(Math.random() * 5) + 1,
      count: Math.floor(Math.random() * 100),
    },
    cookTime: Math.floor(Math.random() * 60),
  },
  {
    id: 9,
    name: "Special Salad Chicken",
    image: "https://picsum.photos/id/92/400",
    rating: {
      value: Math.floor(Math.random() * 5) + 1,
      count: Math.floor(Math.random() * 100),
    },
    cookTime: Math.floor(Math.random() * 60),
  },
  {
    id: 10,
    name: "Special Salad Chicken",
    image: "https://picsum.photos/id/101/400",
    rating: {
      value: Math.floor(Math.random() * 5) + 1,
      count: Math.floor(Math.random() * 100),
    },
    cookTime: Math.floor(Math.random() * 60),
  },
  {
    id: 11,
    name: "Special Salad Chicken",
    image: "https://picsum.photos/id/932/400",
    rating: {
      value: Math.floor(Math.random() * 5) + 1,
      count: Math.floor(Math.random() * 100),
    },
    cookTime: Math.floor(Math.random() * 60),
  },
  {
    id: 12,
    name: "Special Salad Chicken",
    image: "https://picsum.photos/id/121/400",
    rating: {
      value: Math.floor(Math.random() * 5) + 1,
      count: Math.floor(Math.random() * 100),
    },
    cookTime: Math.floor(Math.random() * 60),
  },
];
