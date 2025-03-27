import { boolean, integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { users } from './users';

export const recipes = pgTable('recipes', {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull(),
  description: text(),
  imageUrl: text().notNull(),
  authorId: text()
    .notNull()
    .references(() => users.clerkId),
  cuisineType: text().notNull(),
  mealType: text().notNull(),
  categories: text().array().notNull(),
  preparationTime: integer().notNull(),
  cookingTime: integer().notNull(),
  restTime: integer(),
  activeTime: integer(),
  servings: integer().notNull(),
  servingSize: text(),
  yield: text(),
  difficulty: text().notNull(),
  dietaryTags: text().array().notNull(),
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
  createdAt: timestamp().defaultNow().notNull(),
});
