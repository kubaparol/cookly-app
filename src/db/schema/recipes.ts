import { relations } from 'drizzle-orm';
import {
  boolean,
  doublePrecision,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

import { comments } from './comments';
import { equipment } from './equipment';
import { favorites } from './favorites';
import { ingredients } from './ingredients';
import { steps } from './steps';
import { substitutions } from './substitutions';
import { tips } from './tips';
import { users } from './users';
import { views } from './views';

export const recipes = pgTable('recipes', {
  id: uuid().primaryKey().defaultRandom(),
  title: text(),
  description: text(),
  imageUrl: text(),
  authorId: text()
    .notNull()
    .references(() => users.clerkId),
  cuisineType: text(),
  mealType: text(),
  categories: text().array(),
  preparationTime: integer(),
  cookingTime: integer(),
  restTime: integer(),
  activeTime: integer(),
  servings: integer(),
  servingSize: text(),
  yield: text(),
  difficulty: text(),
  dietaryTags: text().array(),
  storageInstructions: text(),
  reheatingInstructions: text(),
  makeAheadInstructions: text(),
  allergens: text().array(),
  seasonality: text(),
  costLevel: text(),
  notes: text(),
  calories: integer(),
  protein: integer(),
  carbs: integer(),
  fat: integer(),
  termsAccepted: boolean().notNull().default(false),
  averageRating: doublePrecision().notNull().default(0),
  status: text({ enum: ['draft', 'published', 'archived'] })
    .notNull()
    .default('draft'),
  canBePublished: boolean().notNull().default(false),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const recipesRelations = relations(recipes, ({ one, many }) => ({
  author: one(users, {
    fields: [recipes.authorId],
    references: [users.clerkId],
  }),
  ingredients: many(ingredients),
  steps: many(steps),
  equipment: many(equipment),
  substitutions: many(substitutions),
  tips: many(tips),
  comments: many(comments),
  favorites: many(favorites),
  views: many(views),
}));

export type RecipeStatus = (typeof recipes.status.enumValues)[number];
