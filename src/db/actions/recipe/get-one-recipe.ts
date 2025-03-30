'use server';

import { InferSelectModel, eq } from 'drizzle-orm';

import { handleError } from '@/utils';

import { db } from '@/db/drizzle';
import { equipment, ingredients, recipes, steps, substitutions, tips } from '@/db/schema';

export type Recipe = InferSelectModel<typeof recipes> & {
  author: {
    clerkId: string;
    firstName: string | null;
    lastName: string | null;
    imageUrl: string | null;
  };
  ingredients: InferSelectModel<typeof ingredients>[];
  steps: InferSelectModel<typeof steps>[];
  substitutions: InferSelectModel<typeof substitutions>[];
  tips: InferSelectModel<typeof tips>[];
  equipment: InferSelectModel<typeof equipment>[];
};

export async function getOneRecipe(id: string) {
  try {
    return await db.query.recipes.findFirst({
      where: eq(recipes.id, id),
      with: {
        author: {
          columns: {
            clerkId: true,
            firstName: true,
            lastName: true,
            imageUrl: true,
          },
        },
        ingredients: true,
        steps: true,
        substitutions: true,
        tips: true,
        equipment: true,
      },
    });
  } catch (error) {
    handleError(error);
  }
}
