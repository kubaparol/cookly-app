import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { recipes } from './recipes';

export const steps = pgTable('steps', {
  id: uuid('id').primaryKey().defaultRandom(),
  recipeId: uuid('recipe_id')
    .notNull()
    .references(() => recipes.id),
  description: text('description').notNull(),
  order: integer('order').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
