import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

import { recipes } from './recipes';

export const equipment = pgTable('equipment', {
  id: uuid().primaryKey().defaultRandom(),
  recipeId: uuid()
    .notNull()
    .references(() => recipes.id, { onDelete: 'cascade' }),
  name: text().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});

export const equipmentRelations = relations(equipment, ({ one }) => ({
  recipe: one(recipes, {
    fields: [equipment.recipeId],
    references: [recipes.id],
  }),
}));
