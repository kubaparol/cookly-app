import { integer, pgTable, uuid } from 'drizzle-orm/pg-core';

import { recipes } from './recipes';

export const nutritionalInfo = pgTable('nutritional_info', {
  id: uuid().primaryKey().defaultRandom(),
  recipeId: uuid()
    .notNull()
    .references(() => recipes.id, { onDelete: 'cascade' }),
  calories: integer(),
  protein: integer(),
  carbs: integer(),
  fat: integer(),
});
