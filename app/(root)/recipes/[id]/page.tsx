import { Dot, UtensilsCrossed } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getOneRecipe } from '@/db';

import { PageProps } from '@/types';

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const id = props.params.id as string;

  const recipe = await getOneRecipe(id);

  return {
    title: recipe?.title,
    description: recipe?.description,
    openGraph: {
      title: recipe?.title,
      ...(recipe?.description && { description: recipe.description }),
      images: [
        {
          url: recipe?.imageUrl!,
          width: 800,
          height: 600,
          alt: `${recipe?.title} picture`,
        },
      ],
    },
  };
}

export default async function RecipePage(props: PageProps) {
  const id = props.params.id as string;

  const recipe = await getOneRecipe(id);

  if (!recipe) {
    notFound();
  }

  return (
    <section className="wrapper mx-auto grid w-full !max-w-7xl gap-6 !py-12">
      <header className="flex items-center gap-3 border-b border-primary py-4 text-primary-900">
        <UtensilsCrossed className="size-8" />

        <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">{recipe.title}</h1>
      </header>

      {recipe.description && <p className="text-primary-950">{recipe.description}</p>}

      <div className="relative h-60 overflow-hidden rounded-lg shadow-xl md:h-96 lg:h-[30rem]">
        <Image src={recipe.imageUrl} alt={`${recipe.title} picture`} fill objectFit="cover" />
      </div>

      <div className="grid gap-8 rounded-xl bg-primary-50 p-5 shadow-xl md:grid-cols-[350px,1fr] md:p-6">
        <div className="flex h-fit flex-col gap-4 rounded-lg bg-white p-4 shadow-md md:p-6">
          <h2 className="border-b border-primary pb-2 text-xl font-bold text-primary-950 md:text-2xl">
            Steps
          </h2>

          <ul className="space-y-2 md:space-y-3">
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient.id} className="flex items-center space-x-2 text-primary-950">
                <Dot className="text-primary" />

                <p>
                  {ingredient.quantity} {ingredient.unit}{' '}
                  <span className="font-light">{ingredient.name}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="border-b border-primary pb-2 text-xl font-bold text-primary-950 md:text-2xl">
            Ingredients
          </h2>

          <ol className="space-y-6">
            {recipe.steps.map((step, index) => (
              <li key={step.id} className="flex items-start space-x-4">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white md:h-8 md:w-8 md:text-base">
                  {index + 1}
                </span>
                <p className="leading-relaxed text-primary-950">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
