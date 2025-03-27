import { boolean, integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { users } from './users';

export const recipes = pgTable('recipes', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description'),
  imageUrl: text('image_url').notNull(),
  authorId: text('author_id')
    .notNull()
    .references(() => users.clerkId),
  cuisineType: text('cuisine_type').notNull(),
  mealType: text('meal_type').notNull(),
  categories: text('categories').array().notNull(),
  preparationTime: integer('preparation_time').notNull(),
  cookingTime: integer('cooking_time').notNull(),
  restTime: integer('rest_time'),
  activeTime: integer('active_time'),
  servings: integer('servings').notNull(),
  servingSize: text('serving_size'),
  yield: text('yield'),
  difficulty: text('difficulty').notNull(),
  dietaryTags: text('dietary_tags').array().notNull(),
  equipment: text('equipment').array(),
  storageInstructions: text('storage_instructions'),
  reheatingInstructions: text('reheating_instructions'),
  makeAheadInstructions: text('make_ahead_instructions'),
  substitutions: text('substitutions').array(),
  tipsAndTricks: text('tips_and_tricks').array(),
  nutritionalInfo: text('nutritional_info').array(),
  allergens: text('allergens').array(),
  seasonality: text('seasonality'),
  costLevel: text('cost_level'),
  notes: text('notes'),
  termsAccepted: boolean('terms_accepted').notNull().default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
