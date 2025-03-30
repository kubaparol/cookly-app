'use server';

import { InferSelectModel, desc, eq } from 'drizzle-orm';

import { handleError } from '@/utils';

import { db } from '@/db/drizzle';
import { comments, equipment, ingredients, recipes, steps, substitutions, tips } from '@/db/schema';

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
  comments: (InferSelectModel<typeof comments> & {
    author: {
      clerkId: string;
      firstName: string | null;
      lastName: string | null;
      imageUrl: string | null;
    };
  })[];
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
        comments: {
          with: {
            author: {
              columns: {
                clerkId: true,
                firstName: true,
                lastName: true,
                imageUrl: true,
              },
            },
          },
          orderBy: desc(comments.createdAt),
        },
      },
    });
  } catch (error) {
    handleError(error);
  }
}
