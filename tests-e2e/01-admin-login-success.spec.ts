import { test, expect } from '@playwright/test';

test.describe('Administrator: Login and Logout', () => {

    test('TC-001: admin can log in and then log out', async ({ page }) => {

        // --- Step 1: Navigate to login page ---
        await test.step('Navigate to Login Page (login.php)', async () => {
            await page.goto('login.php');
        });

        // --- Step 2: Enter credentials and login ---
        await test.step('Log in with correct admin credentials', async () => {
            await page.locator('[name="login"]').fill('admin');
            await page.locator('[name="pass"]').fill('admin');
            await page.locator('[type="submit"][value="Logi sisse"]').click();
        });

        // --- Step 3: Verify successful login ---
        let logoutButton: any; // Variable declaration for the button
        await test.step('Verify successful redirection and Logout button visibility', async () => {
            // Check URL and navigation
            await expect(page).toHaveURL(/tellimus.php/); 
            // Check for the presence of the "Logout" button
            logoutButton = page.getByRole('link', { name: 'Logout' }); 
            await expect(logoutButton).toBeVisible();
        });

        // --- Step 4: Logout ---
        await test.step('Execute Logout by clicking "Logi välja"', async () => {
            await logoutButton.click();
        });

        // --- Step 5: Verify successful logout ---
        await test.step('Verify redirection back to login page and invisibility of the Logout button', async () => {
            // Check URL
            await expect(page).toHaveURL(/login.php/); 
            // Check that the "Logout" button is no longer visible
            await expect(logoutButton).not.toBeVisible();
            // Check that the login form is active again
            await expect(page.locator('[name="login"]')).toBeVisible();
        });
    });
});