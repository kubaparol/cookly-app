import { sql } from 'drizzle-orm';
import { doublePrecision, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const ingredients = pgTable('ingredients', {
  id: text()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  recipeId: text().notNull(),
  name: text().notNull(),
  quantity: doublePrecision().notNull(),
  unit: text().notNull(),
  createdAt: timestamp({ mode: 'date', precision: 3 }).defaultNow(),
});
