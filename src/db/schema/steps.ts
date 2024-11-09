import { sql } from 'drizzle-orm';
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const steps = pgTable('steps', {
  id: text()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  recipeId: text().notNull(),
  description: text().notNull(),
  order: integer().notNull(),
  createdAt: timestamp({ mode: 'date', precision: 3 }).defaultNow(),
});
