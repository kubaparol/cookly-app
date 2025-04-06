import { createClerkClient } from '@clerk/backend';
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
import { updateRecipeAverageScore } from './actions';
import { db } from './drizzle';
import {
  comments,
  commentsReplies,
  equipment,
  ingredients,
  recipes,
  steps,
  substitutions,
  tips,
  users,
} from './schema';

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

/**
 * Seeds the database with 50 elaborate recipes
 * Uses @faker-js/faker for random data and picsum.photos for images
 */
export const seedRecipes = async () => {
  console.log('🌱 Starting recipe seeding process...');

  const allUsers = await db.select().from(users);

  // Generate 50 recipes
  for (let i = 0; i < 50; i++) {
    try {
      const emailAddress = faker.internet.email();

      const user = await clerkClient.users.createUser({
        emailAddress: [emailAddress],
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        password: emailAddress,
      });

      // 1. Create the recipe
      const randomMealType = faker.helpers.arrayElement(mealTypes).value;
      const randomCuisineType = faker.helpers.arrayElement(cuisineTypes).value;
      const randomDifficulty = faker.helpers.arrayElement(difficultyLevels).value;
      const randomSeason = faker.helpers.arrayElement(seasons).value;
      const randomCostLevel = faker.helpers.arrayElement(costLevels).value;

      // Generate random categories (2-5)
      const randomCategoriesCount = faker.number.int({ min: 1, max: 5 });
      const randomCategories = faker.helpers.arrayElements(
        categories.map((cat) => cat.value),
        randomCategoriesCount,
      );

      // Generate random dietary tags (0-3)
      const randomDietaryTagsCount = faker.number.int({ min: 1, max: 8 });
      const randomDietaryTags = faker.helpers.arrayElements(
        dietaryTags.map((tag) => tag.value),
        randomDietaryTagsCount,
      );

      // Generate random allergens (0-3)
      const randomAllergensCount = faker.number.int({ min: 1, max: 8 });
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
      const calories = faker.number.int({ min: 150, max: 800 });
      const protein = faker.number.int({ min: 5, max: 50 });
      const carbs = faker.number.int({ min: 10, max: 100 });
      const fat = faker.number.int({ min: 5, max: 40 });
      const title = faker.food.adjective() + ' ' + faker.food.dish();

      console.log('Waiting for 2 seconds to avoid hitting the rate limit...');
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Random picsum.photos image with appropriate dimensions for recipes
      const imageResponse = await fetch(
        `https://api.unsplash.com/photos/random/?client_id=${process.env.UNSPLASH_CLIENT_ID}&query=${title}`,
        {
          method: 'GET',
        },
      );

      const image = await imageResponse.json();

      const imageUrl = image.urls.regular;

      console.log('Waiting for 2 seconds to receive Webhook from Clerk...');
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log('Creating recipe...');

      // Create the recipe in the database
      const [newRecipe] = await db
        .insert(recipes)
        .values({
          title: title[0].toUpperCase() + title.slice(1).toLowerCase(),
          description: faker.food.description(),
          imageUrl,
          authorId: user.id,
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
          canBePublished: true,
          status: 'published',
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
          name: faker.food.ingredient(),
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
          original: faker.food.ingredient(),
          substitute: faker.food.ingredient(),
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

      // 7. Create comments from real users with replies from the recipe author
      // Only add comments if we have users in the database
      if (allUsers.length > 0) {
        const commentsCount = faker.number.int({ min: 2, max: 8 });

        // Create comments from random existing users
        for (let j = 0; j < commentsCount; j++) {
          // Select a random user that isn't the author
          let randomUser;
          do {
            randomUser = faker.helpers.arrayElement(allUsers);
          } while (randomUser.clerkId === user.id);

          // Create the comment
          const [newComment] = await db
            .insert(comments)
            .values({
              id: faker.string.uuid(),
              recipeId: newRecipe.id,
              authorId: randomUser.clerkId,
              content: faker.helpers.arrayElement([
                faker.lorem.paragraph(1),
                `I ${faker.helpers.arrayElement(['loved', 'enjoyed', 'really liked'])} this recipe! ${faker.lorem.sentence()}`,
                `${faker.helpers.arrayElement(['Tried this last night', 'Made this for dinner', 'Cooked this yesterday'])}. ${faker.lorem.sentence()}`,
                `The ${faker.helpers.arrayElement(['flavors', 'texture', 'taste'])} was ${faker.helpers.arrayElement(['amazing', 'perfect', 'wonderful'])}! ${faker.lorem.sentence()}`,
                `${faker.helpers.arrayElement(['Will definitely make again', 'Going into my regular rotation', 'My family loved it'])}. ${faker.lorem.sentence()}`,
              ]),
              rating: faker.number.int({ min: 1, max: 5 }),
              createdAt: faker.date.recent({ days: 30 }),
            })
            .returning();

          await updateRecipeAverageScore(newComment.recipeId);

          // 50% chance to add a reply from the recipe author
          if (faker.datatype.boolean(0.5)) {
            await db.insert(commentsReplies).values({
              id: faker.string.uuid(),
              commentId: newComment.id,
              authorId: user.id,
              content: faker.helpers.arrayElement([
                `Thank you, ${randomUser.firstName}! ${faker.lorem.sentence()}`,
                `I'm glad you enjoyed it! ${faker.lorem.sentence()}`,
                `Thanks for trying the recipe! ${faker.lorem.sentence()}`,
                `I appreciate your feedback! ${faker.lorem.sentence()}`,
                `${faker.helpers.arrayElement(['Happy to hear that', 'So glad you liked it', 'Thanks for sharing'])}. ${faker.lorem.sentence()}`,
              ]),
              createdAt: faker.date.recent({ days: 15 }),
            });
          }
        }

        console.log(`Added ${commentsCount} comments with replies to recipe #${i + 1}`);
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
