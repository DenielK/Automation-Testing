// tests-e2e/07-admin-logout.spec.ts

import { test, expect } from '@playwright/test';

/*
 * TEST DESCRIPTION
 * Initial State: User is not logged in.
 * Action: 1. Log in as administrator. 2. Click the "Logi välja" button.
 * Expectation: User is redirected to the login page (login2.php), and the "Logi välja" button is no longer visible.
 */
test.describe('Administrator: Logout', () => { // Changed describe name

  test('TC-006: admin can log out', async ({ page }) => { // Changed test name
    // --- Step 1: Login (Setup) ---
    await page.goto('login.php');
    await page.locator('[name="login"]').fill('admin');
    await page.locator('[name="pass"]').fill('admin');
    await page.locator('[type="submit"][value="Logi sisse"]').click();

    const logoutButton = page.getByRole('link', { name: 'Logout' });
    await expect(logoutButton).toBeVisible(); // Verify login

    // --- Step 2: Logout ---
    await logoutButton.click();

    // --- Step 3: Verify Logout ---
    await expect(page).toHaveURL(/login.php/); // Expect login page URL
    await expect(logoutButton).not.toBeVisible(); // Expect logout button is gone
    await expect(page.locator('[name="login"]')).toBeVisible(); // Expect login form is back
  });
});