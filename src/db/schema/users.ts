import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  clerkId: text().primaryKey(),
  firstName: text(),
  lastName: text(),
  email: text(),
  imageUrl: text(),
  createdAt: timestamp().defaultNow().notNull(),
});
