import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { recipes } from './recipes';

export const steps = pgTable('steps', {
  id: uuid().primaryKey().defaultRandom(),
  recipeId: uuid()
    .notNull()
    .references(() => recipes.id),
  description: text().notNull(),
  order: integer().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});
