import { Dot, UtensilsCrossed } from 'lucide-react';
import Image from 'next/image';

const recipe = {
  title: 'Classic Spaghetti Bolonese',
  rating: 4.5,
  cookTime: 30,
  author: 'John Doe',
  cookingTime: 30,
  image: 'https://utfs.io/f/tn9qWFoW4N1fDPxoPyWH4Rn2ECSm31GzYqLeo7sIk0dbPjct',
  description:
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae totam repellat voluptate recusandae dignissimos dicta et consectetur. In, magnam earum. Optio deleniti velit provident consectetur minus earum natus corrupti recusandae.',
  ingredients: new Array(9).fill(1).map(() => ({
    id: Math.random().toString(36).substr(2, 9),
    name: 'Ingredient',
    quantity: Math.floor(Math.random() * 100),
    unit: 'g',
  })),
  steps: new Array(3).fill(1).map(() => ({
    id: Math.random().toString(36).substr(2, 9),
    description:
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae totam repellat voluptate recusandae dignissimos dicta et consectetur. In, magnam earum. Optio deleniti velit provident consectetur minus earum natus corrupti recusandae.',
  })),
};

export default function RecipePage() {
  return (
    <section className="mx-auto grid gap-6">
      <header className="flex items-center gap-3 border-b border-primary py-4 text-primary-900">
        <UtensilsCrossed className="size-8" />

        <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">{recipe.title}</h1>
      </header>

      <p className="text-primary-950">{recipe.description}</p>

      <div className="relative h-60 overflow-hidden rounded-lg shadow-xl md:h-96 lg:h-[30rem]">
        <Image src={recipe.image} alt={`${recipe.title} picture`} layout="fill" objectFit="cover" />
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
