import { doublePrecision, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { recipes } from './recipes';

export const ingredients = pgTable('ingredients', {
  id: uuid('id').primaryKey().defaultRandom(),
  recipeId: uuid('recipe_id')
    .notNull()
    .references(() => recipes.id),
  name: text('name').notNull(),
  quantity: doublePrecision('quantity').notNull(),
  unit: text('unit').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
