import { relations } from 'drizzle-orm';
import { pgTable, timestamp, unique, uuid, varchar } from 'drizzle-orm/pg-core';

import { recipes } from './recipes';

export const views = pgTable(
  'views',
  {
    id: uuid().primaryKey().defaultRandom(),
    recipeId: uuid()
      .notNull()
      .references(() => recipes.id, { onDelete: 'cascade' }),
    ipAddress: varchar({ length: 45 }).notNull(),
    createdAt: timestamp().defaultNow().notNull(),
  },
  (table) => ({
    uniqueView: unique().on(table.recipeId, table.ipAddress),
  }),
);

export const viewsRelations = relations(views, ({ one }) => ({
  recipe: one(recipes, {
    fields: [views.recipeId],
    references: [recipes.id],
  }),
}));
