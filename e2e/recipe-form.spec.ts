import test, { expect } from '@playwright/test';
import path from 'path';

import { ProjectUrls } from '@/constants';

const recipe = {
  title: 'Test Recipe',
  description: 'This is a test recipe',
  imageUrl: 'https://utfs.io/f/tn9qWFoW4N1fTrsshufj02R3gc8GJtPrsQjC9qLAuXFnziYo',
  ingredient: {
    name: 'Test Ingredient',
    quantity: 1,
    unit: 'cups',
  },
  step: 'This is a test step',
};

test.beforeEach(async ({ page }) => {
  await page.goto(`http://localhost:3000${ProjectUrls.createRecipe}`);

  const email = page.getByLabel('Email address');
  await email.fill(process.env.E2E_CLERK_USER_USERNAME!);

  await page.getByRole('button', { name: 'Continue' }).click();

  const password = page.getByLabel('Password', { exact: true });
  await password.fill(process.env.E2E_CLERK_USER_PASSWORD!);

  await page.getByRole('button', { name: 'Continue' }).click();
  await page.goto(`http://localhost:3000${ProjectUrls.createRecipe}`);

  await page.reload();
});

test.describe('Recipe Form', () => {
  test('should allow the user to create a new recipe', async ({ page }) => {
    // title
    const title = page.getByPlaceholder('e.g., Classic Spaghetti');
    await title.fill(recipe.title);
    //

    // description
    const recipeDescription = page.getByPlaceholder('e.g., A rich and hearty');
    if (recipe.description) {
      await recipeDescription.fill(recipe.description);
    }
    //

    // image
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.getByText('Select from computer').click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(__dirname, '../public/beef.jpg'));
    //

    // ingredient
    await page.getByRole('button', { name: 'Add Ingredient' }).click();

    const quantity = page.getByPlaceholder('e.g., 100');
    await quantity.fill(recipe.ingredient.quantity.toString());

    await page.getByRole('combobox').click();
    await page.getByLabel(recipe.ingredient.unit).click();

    const name = page.getByPlaceholder('e.g., Olive Oil');
    await name.fill(recipe.ingredient.name);

    await page.getByRole('button', { name: 'Save' }).click();

    const ingredient = page.getByTestId('ingredient');

    await expect(ingredient).toHaveText(
      `${recipe.ingredient.quantity} ${recipe.ingredient.unit} ${recipe.ingredient.name}`,
    );
    //

    // step
    await page.getByRole('button', { name: 'Add Step' }).click();

    const stepDescription = page.getByPlaceholder('e.g., Preheat the oven to 180');
    await stepDescription.fill(recipe.step);

    await page.getByRole('button', { name: 'Save' }).click();

    const step = page.getByTestId('step');

    await expect(step).toHaveText(`1. ${recipe.step}`);
    //

    const submitButton = page.getByRole('button', { name: 'Create Recipe' });
    await submitButton.click();

    await expect(page.locator('h1')).toHaveText('Success!');
  });

  test('should display an error message if the form is submitted with missing fields', async ({
    page,
  }) => {
    const submitButton = page.getByRole('button', { name: 'Create Recipe' });
    await submitButton.click();

    const errorMessage = page.getByTestId('error-message').first();

    await expect(errorMessage).toBeVisible();
  });

  test('should allow the user to add and remove ingredients', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Ingredient' }).click();

    const quantity = page.getByPlaceholder('e.g., 100');
    await quantity.fill(recipe.ingredient.quantity.toString());

    await page.getByRole('combobox').click();
    await page.getByLabel(recipe.ingredient.unit).click();

    const name = page.getByPlaceholder('e.g., Olive Oil');
    await name.fill(recipe.ingredient.name);

    await page.getByRole('button', { name: 'Save' }).click();

    const ingredient = page.getByTestId('ingredient');

    await expect(ingredient).toHaveText(
      `${recipe.ingredient.quantity} ${recipe.ingredient.unit} ${recipe.ingredient.name}`,
    );

    await page.getByTestId('ingredient').getByRole('button').nth(1).click();

    await page.getByRole('button', { name: 'Delete' }).click();

    await expect(ingredient).not.toBeVisible();
  });

  test('should allow the user to add and remove steps', async ({ page }) => {
    await page.getByRole('button', { name: 'Add Step' }).click();

    const stepDescription = page.getByPlaceholder('e.g., Preheat the oven to 180');
    await stepDescription.fill(recipe.step);

    await page.getByRole('button', { name: 'Save' }).click();

    const step = page.getByTestId('step');

    await expect(step).toHaveText(`1. ${recipe.step}`);

    await page.getByTestId('step').getByRole('button').nth(1).click();

    await page.getByRole('button', { name: 'Delete' }).click();

    await expect(step).not.toBeVisible();
  });
});
