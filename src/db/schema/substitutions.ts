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
