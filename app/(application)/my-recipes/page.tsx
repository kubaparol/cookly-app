import { PlusIcon } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

import { ProjectUrls, appPageTitles } from '@/constants';

import { getMyRecipes } from '@/db';

import PageTitle from '@/components/base/PageTitle';
import Search from '@/components/base/Search';
import RecipeCard from '@/components/shared/RecipeCard';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: appPageTitles[ProjectUrls.myRecipes],
};

export default async function RecipesPage() {
  const recipes = await getMyRecipes();

  return (
    <section className="grid gap-24 pb-8">
      <header className="grid gap-3">
        <PageTitle />

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
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-x-8 gap-y-20">
          {recipes?.map((item, index) => (
            <li key={index}>
              <RecipeCard title={item.title} imageUrl={item.imageUrl} isAuthor={index % 2 === 0} />
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
