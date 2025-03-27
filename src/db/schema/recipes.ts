import { sql } from 'drizzle-orm';
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const recipes = pgTable('recipes', {
  id: text()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: text().notNull(),
  description: text(),
  imageUrl: text().notNull(),
  authorId: text().notNull(),
  cuisineType: text().notNull(),
  mealType: text().notNull(),
  categories: text().array().notNull(),
  preparationTime: integer().notNull(),
  cookingTime: integer().notNull(),
  servings: integer().notNull(),
  difficulty: text().notNull(),
  dietaryTags: text().array().notNull(),
  notes: text(),
  createdAt: timestamp({ mode: 'date', precision: 3 }).defaultNow(),
});
