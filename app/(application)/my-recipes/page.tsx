import { currentUser } from '@clerk/nextjs/server';
import { PlusIcon } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ProjectUrls } from '@/constants';

import { getMyRecipes } from '@/db';

import PageTitle from '@/components/base/PageTitle';
import Search from '@/components/base/Search';
import RecipeCard from '@/components/shared/RecipeCard';
import { Button } from '@/components/ui/button';

import { PageProps } from '@/types';

export const metadata: Metadata = {
  title: 'My Recipes',
};

export default async function RecipesPage(props: PageProps) {
  const recipes = await getMyRecipes({ query: props.searchParams.query as string });
  const user = await currentUser();

  if (!user) {
    notFound();
  }

  return (
    <section className="grid gap-24 pb-8">
      <header className="grid gap-3">
        <PageTitle title="My Recipes" />

        <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-8">
          <Search placeholder="Search recipes..." />

          <Button asChild className="w-full sm:w-fit">
            <Link href={ProjectUrls.createRecipe} className="gap-3">
              Create Recipe
              <PlusIcon className="size-5" />
            </Link>
          </Button>
        </div>
      </header>

      <div className="grid gap-10">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
          {recipes?.map((recipe, index) => (
            <li key={index}>
              <RecipeCard
                id={recipe.id}
                title={recipe.title}
                imageUrl={recipe.imageUrl}
                isAuthor={user.id === recipe.authorId}
              />
            </li>
          ))}
        </ul>

        {/* <Pagination totalPages={10} className="mx-auto" /> */}
      </div>
    </section>
  );
}

function getRandomDishes(count: number) {
  const dishNames = [
    'Crispy Zucchini Tempura',
    'Spicy Mango Curry',
    'Honey Glazed Chicken Tenders',
    'Lemon Basil Panna Cotta',
    'Maple Roasted Pumpkin Soup',
    'Saffron Infused Risotto',
    'Coconut Lime Shrimp Skewers',
    'Blueberry Lavender Tart',
    'Chimichurri Grilled Steak',
    'Ginger Sesame Noodles',
    'Balsamic Fig Bruschetta',
    'Smoked Paprika Salmon',
    'Truffle Parmesan Fries',
    'Miso Glazed Eggplant',
    'Raspberry White Chocolate Mousse',
    'Peanut Butter Banana Smoothie',
    'Caramelized Onion Tart',
    'Pumpkin Spice Latte',
    'Mushroom Stroganoff',
    'Candied Pecan Salad',
    'Cajun Jambalaya',
    'Peach Basil Sorbet',
    'Mint Chocolate Chip Ice Cream',
    'Pistachio Crusted Halibut',
    'Sesame Ginger Tofu',
    'Pineapple Coconut Cake',
    'Lavender Lemonade',
    'Cilantro Lime Chicken',
    'Raspberry Almond Tart',
    'Pumpkin Sage Risotto',
    'Mango Coconut Smoothie',
    'Spicy Peanut Noodles',
    'Peach Basil Sorbet',
    'Mint Chocolate Chip Ice Cream',
    'Pistachio Crusted Halibut',
  ];

  // Helper function to generate a single random dish
  const getRandomDish = () => {
    const randomName = dishNames[Math.floor(Math.random() * dishNames.length)];
    const imageUrl = `https://picsum.photos/id/${Math.floor(Math.random() * 1000) + 1}/300/300`;
    return {
      name: randomName,
      imageUrl: imageUrl,
    };
  };

  // Generate an array of random dishes based on the count parameter
  return Array.from({ length: count }, getRandomDish);
}
