import { sql } from 'drizzle-orm';
import { integer, pgTable, text } from 'drizzle-orm/pg-core';

export const ingredients = pgTable('ingredients', {
  id: text()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  recipeId: text().notNull(),
  name: text().notNull(),
  quantity: integer().notNull(),
  unit: text().notNull(),
});
