import { test, expect } from '@playwright/test';

// Unique data for product creation
const TEST_LOGIN = 'test';
const TEST_PASSWORD = 'test';

const TEST_PRODUCT_NAME = 'test_item';
const TEST_PRODUCT_PRICE = '999';
const TEST_PRODUCT_DESCRIPTION = 'for automation tests';

// New test case: Create product as a standard user
test.describe('TC-005: Non-Admin Flow: Product Management (Create)', () => { 

    /*
     * TEST DESCRIPTION (TC-005: Create New Product as Non-Admin)
     * Goal: Ensure that a standard user can successfully create a new product on the toode.php page.
     */
    test('TC-005: Non-admin user can successfully create a new product', async ({ page }) => {

        // --- Step 1: Login as Standard User ('test', 'test') ---
        await test.step(`1. Log in as Standard User (login: ${TEST_LOGIN}, pass: ${TEST_PASSWORD})`, async () => {
            // Authentication
            await page.goto('login.php'); 
            await page.locator('[name="login"]').fill(TEST_LOGIN); 
            await page.locator('[name="pass"]').fill(TEST_PASSWORD); 
            await page.locator('[type="submit"][value="Logi sisse"]').click();
            
            // Verify successful login (redirection to any post-login page)
            await expect(page).toHaveURL(/tellimus.php|toode.php|index.php/); 
        });

        // --- Step 2: Navigate to the Products page (toode.php) ---
        await test.step('2. Navigate to the Products page (toode.php)', async () => {
            await page.goto('toode.php');
            await expect(page).toHaveURL(/toode.php/);
        });

        // --- Step 3: Add New Product ---
        await test.step(`3. Create a unique product (Name: ${TEST_PRODUCT_NAME}, Price: ${TEST_PRODUCT_PRICE})`, async () => {
            
            // 3.1 Click the "Add New Product" button to show the form
            const addNewProductButton = page.locator('#add-product-button');
            await addNewProductButton.click();
            
            // 3.2 Fill in the fields
            await page.locator('[name="nimetus"]').fill(TEST_PRODUCT_NAME); 
            await page.locator('[name="hind"]').fill(TEST_PRODUCT_PRICE); 
            await page.locator('[name="kirjeldus"]').fill(TEST_PRODUCT_DESCRIPTION); 
            
            // 3.3 Submit the product
            await page.locator('[name="lisa_Toode"]').click(); 
            
            // 3.4 Verify there is no error and we remain on toode.php
            await expect(page).toHaveURL(/toode.php/);
            
            // Check that the success message is visible
            const successMessage = page.locator('.success-message');
            await expect(successMessage).toBeVisible();
        });

        // --- Step 4: Verify the product is visible in the table ---
        await test.step('4. Verify that the new product (test_item) is visible in the list', async () => {
            
            // Find the table row containing the unique product name
            const newProductRow = page.locator('table').getByText(TEST_PRODUCT_NAME).first();
            await expect(newProductRow).toBeVisible();
            
            // Check that the price is also visible (should be formatted as 999.00 €)
            const newProductPrice = page.locator('table').getByText('999.00 €').first();
            await expect(newProductPrice).toBeVisible();
        });
    });
});