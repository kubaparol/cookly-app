import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { recipes } from './recipes';
import { users } from './users';

export const favorites = pgTable('favorites', {
  id: uuid().primaryKey().defaultRandom(),
  recipeId: uuid()
    .notNull()
    .references(() => recipes.id, { onDelete: 'cascade' }),
  userId: text()
    .notNull()
    .references(() => users.clerkId, { onDelete: 'cascade' }),
  createdAt: timestamp().defaultNow().notNull(),
});

export const favoritesRelations = relations(favorites, ({ one }) => ({
  recipe: one(recipes, {
    fields: [favorites.recipeId],
    references: [recipes.id],
  }),
  user: one(users, {
    fields: [favorites.userId],
    references: [users.clerkId],
  }),
}));
