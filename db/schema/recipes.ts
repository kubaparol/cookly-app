import { sql } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const recipes = pgTable('recipes', {
  id: text()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: text().notNull(),
  description: text(),
  imageUrl: text().notNull(),
  authorId: text().notNull(),
  createdAt: timestamp({ mode: 'date', precision: 3 }).defaultNow(),
});
