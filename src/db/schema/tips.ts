import { pgTable, text, uuid } from 'drizzle-orm/pg-core';

import { recipes } from './recipes';

export const tips = pgTable('tips', {
  id: uuid().primaryKey().defaultRandom(),
  recipeId: uuid()
    .notNull()
    .references(() => recipes.id, { onDelete: 'cascade' }),
  description: text().notNull(),
});
