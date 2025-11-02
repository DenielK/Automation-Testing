import { test, expect } from '@playwright/test';

test.describe('Authentication: Negative Scenarios (Password)', () => {

    /*
     * TEST DESCRIPTION (TC-002: Incorrect Password)
     * Goal: Ensure that the administrator cannot log in using the correct login ('admin') and an incorrect password ('wrongpassword').
     * Expectation: Remains on login.php, an error message appears, and the logout button is absent.
     */
    test('TC-002: Should prevent login with correct login and incorrect password', async ({ page }) => {

        // --- Step 1: Navigate to login page ---
        await test.step('1. Navigate to Login Page (login.php)', async () => {
            await page.goto('login.php');
        });

        // --- Step 2: Enter credentials and attempt login ---
        await test.step('2. Attempt login with correct login "admin" and incorrect password "wrongpassword"', async () => {
            await page.locator('[name="login"]').fill('admin');
            await page.locator('[name="pass"]').fill('wrongpassword');
            await page.locator('[type="submit"][value="Logi sisse"]').click();
        });

        // --- Step 3: Verify login FAILED and error message is visible ---
        await test.step('3. Verify that the login failed and error message is visible', async () => {
            
            // 3a. Ensure there is no redirection to the admin panel
            await expect(page).not.toHaveURL(/tellimus.php/, { timeout: 500 });
            
            // 3b. Ensure we remain on the login page
            await expect(page).toHaveURL(/login.php/); 

            // 3c. Check that the error message is displayed
            // (Using the text that should be shown to the user, e.g.: "Kasutajanimi või parool on vale.")
            const errorMessage = page.getByText('Kasutajanimi või parool on vale.'); 
            await expect(errorMessage).toBeVisible(); 
        });
        
        // --- Step 4: Final checks ---
        await test.step('4. Verify that privileged elements are NOT visible', async () => {
            // Check that the "Logi välja" (Logout) button is not visible
            await expect(page.locator('[name="logout"]')).not.toBeVisible();
        });
    });
});