import { relations } from 'drizzle-orm';
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';

import { recipes } from './recipes';

export const substitutions = pgTable('substitutions', {
  id: uuid().primaryKey().defaultRandom(),
  recipeId: uuid()
    .notNull()
    .references(() => recipes.id, { onDelete: 'cascade' }),
  original: text().notNull(),
  substitute: text().notNull(),
});

export const substitutionsRelations = relations(substitutions, ({ one }) => ({
  recipe: one(recipes, {
    fields: [substitutions.recipeId],
    references: [recipes.id],
  }),
}));
