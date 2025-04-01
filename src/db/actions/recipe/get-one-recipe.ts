'use server';

import { currentUser } from '@clerk/nextjs/server';
import { InferSelectModel, and, desc, eq } from 'drizzle-orm';

import { handleError } from '@/utils';

import { db } from '@/db/drizzle';
import {
  comments,
  equipment,
  favorites,
  ingredients,
  recipes,
  steps,
  substitutions,
  tips,
} from '@/db/schema';

import { addView } from '../views';

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
  favorites: {
    id: string;
  }[];
  comments: (InferSelectModel<typeof comments> & {
    author: {
      clerkId: string;
      firstName: string | null;
      lastName: string | null;
      imageUrl: string | null;
    };
    replies?: {
      id: string;
      content: string;
      author: {
        firstName: string | null;
        lastName: string | null;
        imageUrl: string | null;
      } | null;
      createdAt: Date;
    }[];
  })[];
};

export async function getOneRecipe(id: string) {
  try {
    const user = await currentUser();

    await addView(id);

    return await db.query.recipes.findFirst({
      where: and(eq(recipes.id, id), eq(recipes.status, 'published')),
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
        favorites: {
          where: eq(favorites.userId, user?.id || ''),
          columns: {
            id: true,
          },
        },
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
            replies: {
              columns: {
                id: true,
                content: true,
                createdAt: true,
              },
              with: {
                author: {
                  columns: {
                    firstName: true,
                    lastName: true,
                    imageUrl: true,
                  },
                },
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
