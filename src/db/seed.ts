import { faker } from '@faker-js/faker';

import {
  allergens,
  categories,
  costLevels,
  cuisineTypes,
  dietaryTags,
  difficultyLevels,
  mealTypes,
  seasons,
  units,
} from '../constants';
import { db } from './drizzle';
import { equipment, ingredients, recipes, steps, substitutions, tips, users } from './schema';

/**
 * Seeds the database with 50 elaborate recipes
 * Uses @faker-js/faker for random data and picsum.photos for images
 */
export const seedRecipes = async () => {
  console.log('🌱 Starting recipe seeding process...');

  // Get all users from the database to randomly assign as authors
  const allUsers = await db.select().from(users);

  if (allUsers.length === 0) {
    console.error('No users found in the database. Please create users first.');
    return;
  }

  console.log(`Found ${allUsers.length} users to assign as recipe authors.`);

  // Generate 50 recipes
  for (let i = 0; i < 50; i++) {
    try {
      // 1. Create the recipe
      const randomMealType = faker.helpers.arrayElement(mealTypes).value;
      const randomCuisineType = faker.helpers.arrayElement(cuisineTypes).value;
      const randomDifficulty = faker.helpers.arrayElement(difficultyLevels).value;
      const randomSeason = faker.helpers.arrayElement(seasons).value;
      const randomCostLevel = faker.helpers.arrayElement(costLevels).value;

      // Generate random categories (2-5)
      const randomCategoriesCount = faker.number.int({ min: 2, max: 5 });
      const randomCategories = faker.helpers.arrayElements(
        categories.map((cat) => cat.value),
        randomCategoriesCount,
      );

      // Generate random dietary tags (0-3)
      const randomDietaryTagsCount = faker.number.int({ min: 0, max: 3 });
      const randomDietaryTags = faker.helpers.arrayElements(
        dietaryTags.map((tag) => tag.value),
        randomDietaryTagsCount,
      );

      // Generate random allergens (0-3)
      const randomAllergensCount = faker.number.int({ min: 0, max: 3 });
      const randomAllergens = faker.helpers.arrayElements(
        allergens.map((allergen) => allergen.value),
        randomAllergensCount,
      );

      // Preparation and cooking times - more elaborate recipes
      const preparationTime = faker.number.int({ min: 15, max: 60 });
      const cookingTime = faker.number.int({ min: 20, max: 120 });
      const restTime = faker.number.int({ min: 0, max: 60 });
      const activeTime = preparationTime + cookingTime - restTime;

      // Nutrition info (optional)
      const hasNutritionInfo = faker.datatype.boolean(0.7); // 70% chance to have nutrition info
      const calories = hasNutritionInfo ? faker.number.int({ min: 150, max: 800 }) : null;
      const protein = hasNutritionInfo ? faker.number.int({ min: 5, max: 50 }) : null;
      const carbs = hasNutritionInfo ? faker.number.int({ min: 10, max: 100 }) : null;
      const fat = hasNutritionInfo ? faker.number.int({ min: 5, max: 40 }) : null;

      // Random user as author
      const randomUser = faker.helpers.arrayElement(allUsers);

      // Random picsum.photos image with appropriate dimensions for recipes
      const imageWidth = 1200;
      const imageHeight = 800;
      const imageId = faker.number.int({ min: 1, max: 1000 });
      const imageUrl = `https://picsum.photos/id/${imageId}/${imageWidth}/${imageHeight}`;

      // Create the recipe in the database
      const [newRecipe] = await db
        .insert(recipes)
        .values({
          title: faker.commerce.productName(),
          description: faker.lorem.paragraph(faker.number.int({ min: 3, max: 6 })),
          imageUrl,
          authorId: randomUser.clerkId,
          cuisineType: randomCuisineType,
          mealType: randomMealType,
          categories: randomCategories,
          preparationTime,
          cookingTime,
          restTime,
          activeTime,
          servings: faker.number.int({ min: 2, max: 8 }),
          servingSize: faker.helpers.maybe(() => faker.commerce.productAdjective() + ' portion', {
            probability: 0.6,
          }),
          yield: faker.helpers.maybe(
            () => faker.commerce.productAdjective() + ' ' + faker.commerce.product(),
            { probability: 0.4 },
          ),
          difficulty: randomDifficulty,
          dietaryTags: randomDietaryTags,
          storageInstructions: faker.helpers.maybe(() => faker.lorem.paragraph(1), {
            probability: 0.8,
          }),
          reheatingInstructions: faker.helpers.maybe(() => faker.lorem.paragraph(1), {
            probability: 0.7,
          }),
          makeAheadInstructions: faker.helpers.maybe(() => faker.lorem.paragraph(1), {
            probability: 0.5,
          }),
          allergens: randomAllergens,
          seasonality: randomSeason,
          costLevel: randomCostLevel,
          notes: faker.helpers.maybe(() => faker.lorem.paragraph(2), { probability: 0.6 }),
          calories,
          protein,
          carbs,
          fat,
          termsAccepted: true,
        })
        .returning();

      console.log(`Created recipe: ${newRecipe.title}`);

      // 2. Create ingredients (8-20 for elaborate recipes)
      const ingredientsCount = faker.number.int({ min: 8, max: 20 });
      for (let j = 0; j < ingredientsCount; j++) {
        // Get random unit
        const unitGroup = faker.helpers.arrayElement(units);
        const unitOption = faker.helpers.arrayElement(unitGroup.options);

        await db.insert(ingredients).values({
          recipeId: newRecipe.id,
          name: faker.commerce.productName(),
          quantity: faker.number.float({ min: 0.25, max: 5, fractionDigits: 2 }),
          unit: unitOption.value,
        });
      }

      // 3. Create steps (5-15 for elaborate recipes)
      const stepsCount = faker.number.int({ min: 5, max: 15 });
      for (let j = 0; j < stepsCount; j++) {
        await db.insert(steps).values({
          recipeId: newRecipe.id,
          description: faker.lorem.paragraph(faker.number.int({ min: 1, max: 3 })),
          order: j + 1,
        });
      }

      // 4. Create equipment (3-8 items)
      const equipmentCount = faker.number.int({ min: 3, max: 8 });
      for (let j = 0; j < equipmentCount; j++) {
        await db.insert(equipment).values({
          recipeId: newRecipe.id,
          name: faker.commerce.productName(),
        });
      }

      // 5. Create substitutions (0-5)
      const substitutionsCount = faker.number.int({ min: 0, max: 5 });
      for (let j = 0; j < substitutionsCount; j++) {
        await db.insert(substitutions).values({
          recipeId: newRecipe.id,
          original: faker.commerce.productName(),
          substitute: faker.commerce.productName(),
        });
      }

      // 6. Create tips (1-5)
      const tipsCount = faker.number.int({ min: 1, max: 5 });
      for (let j = 0; j < tipsCount; j++) {
        await db.insert(tips).values({
          recipeId: newRecipe.id,
          description: faker.lorem.sentence(faker.number.int({ min: 10, max: 20 })),
        });
      }

      console.log(
        `✓ Recipe #${i + 1} completed with ${ingredientsCount} ingredients, ${stepsCount} steps`,
      );
    } catch (error) {
      console.error(`Error creating recipe #${i + 1}:`, error);
    }
  }

  console.log('🎉 Seeding completed successfully!');
};

// Uncomment to run this seeding function directly
seedRecipes().catch(console.error);
