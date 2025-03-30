import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { comments } from './comments';
import { equipment } from './equipment';
import { ingredients } from './ingredients';
import { steps } from './steps';
import { substitutions } from './substitutions';
import { tips } from './tips';
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
}));
