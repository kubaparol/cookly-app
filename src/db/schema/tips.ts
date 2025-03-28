import { relations } from 'drizzle-orm';
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';

import { recipes } from './recipes';

export const tips = pgTable('tips', {
  id: uuid().primaryKey().defaultRandom(),
  recipeId: uuid()
    .notNull()
    .references(() => recipes.id, { onDelete: 'cascade' }),
  description: text().notNull(),
});

export const tipsRelations = relations(tips, ({ one }) => ({
  recipe: one(recipes, {
    fields: [tips.recipeId],
    references: [recipes.id],
  }),
}));
