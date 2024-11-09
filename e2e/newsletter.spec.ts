import { expect, test } from '@playwright/test';

test.describe('Newsletter', () => {
  test('should make it possible to subscribe', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    const input = page.getByPlaceholder('e.g., johndoe@example.com');

    await input.click();
    await input.fill('johndoe@example.com');

    await page.getByRole('button', { name: 'Subscribe' }).click();
    await expect(page.getByRole('status')).toBeVisible();
  });

  test('should clear the input field after subscribing', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    const input = page.getByPlaceholder('e.g., johndoe@example.com');

    await input.click();
    await input.fill('johndoe@example.com');

    await page.getByRole('button', { name: 'Subscribe' }).click();

    await expect(input).toBeEmpty();
  });
});
