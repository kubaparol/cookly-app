import { relations } from 'drizzle-orm';
import { doublePrecision, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { recipes } from './recipes';

export const ingredients = pgTable('ingredients', {
  id: uuid().primaryKey().defaultRandom(),
  recipeId: uuid()
    .notNull()
    .references(() => recipes.id),
  name: text().notNull(),
  quantity: doublePrecision().notNull(),
  unit: text().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});

export const ingredientsRelations = relations(ingredients, ({ one }) => ({
  recipe: one(recipes, {
    fields: [ingredients.recipeId],
    references: [recipes.id],
  }),
}));
