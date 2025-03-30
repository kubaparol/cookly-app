import { relations } from 'drizzle-orm';
import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { recipes } from './recipes';
import { users } from './users';

export const comments = pgTable('comments', {
  id: uuid().primaryKey().defaultRandom(),
  recipeId: uuid()
    .notNull()
    .references(() => recipes.id, { onDelete: 'cascade' }),
  authorId: text()
    .notNull()
    .references(() => users.clerkId, { onDelete: 'cascade' }),
  rating: integer().notNull(),
  content: text().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});

export const commentsRelations = relations(comments, ({ one }) => ({
  recipe: one(recipes, {
    fields: [comments.recipeId],
    references: [recipes.id],
  }),
  author: one(users, {
    fields: [comments.authorId],
    references: [users.clerkId],
  }),
}));
