import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  clerkId: text('clerk_id').primaryKey(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  email: text('email'),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
