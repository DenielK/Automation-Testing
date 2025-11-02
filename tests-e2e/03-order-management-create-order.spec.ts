import { test, expect } from '@playwright/test';

// Data for the new order
const TEST_QUANTITY = '5';
const TEST_FLOWER_NAME = 'Rose'; 

test.describe('Admin Flow: Order Management', () => {

    /*
     * TEST DESCRIPTION (TC-003: Create New Order)
     * Goal: Ensure that the administrator can successfully create a new order via the form on tellimus.php.
     * Expectation: The new order appears in the orders table with the entered data.
     */
    test('TC-003: Admin can successfully create a new order', async ({ page }) => {

        // --- PRE-CONDITION: Login as Admin ---
        await test.step('PRE-CONDITION: Log in as Admin', async () => {
            await page.goto('login.php'); 
            await page.locator('[name="login"]').fill('admin');
            await page.locator('[name="pass"]').fill('admin');
            await page.locator('[type="submit"][value="Logi sisse"]').click();
            await expect(page).toHaveURL(/tellimus.php/); 
        });

        // --- Step 1: Navigate to Orders Page ---
        await test.step('1. Navigate to Orders Page (tellimus.php)', async () => {
            await page.goto('tellimus.php'); 
            await expect(page).toHaveURL(/tellimus.php/);
        });
        
        // --- Step 2: Click "Add new order" button ---
        await test.step('2. Click "Add new order" button to open the form', async () => {
            await page.getByRole('button', { name: 'Add new order' }).click(); 
        });

        // --- Step 3: Fill in the order form fields ---
        await test.step('3. Fill in the required fields (Quantity and Flower Name)', async () => {
            
            // 3a. Enter Quantity
            await page.locator('[name="tellimus_tukk"]').fill(TEST_QUANTITY);
            
            // 3b. Select the Flower Name (assuming it's a select box based on previous code)
            await page.locator('[name="tellimus_toode"]').selectOption(TEST_FLOWER_NAME); 
            
            // NOTE: Add other required fields here if necessary (e.g., customer ID, price)!
        });

        // --- Step 4: Click "Add Order" (Submit) ---
        await test.step('4. Submit the form by clicking "Add Order"', async () => {
            await page.getByRole('button', { name: 'Add Order' }).click(); 
        });

        // --- Step 5: Verify the new order appears in the table ---
        await test.step('5. Verify that the newly created order appears in the table', async () => {
            
            // 5a. Verify we remain on the correct page
            await expect(page).toHaveURL(/tellimus.php/); 

            // 5b. Look for the row containing the entered quantity
            const newOrderRow = page.locator('table').getByText(TEST_QUANTITY).first();
            await expect(newOrderRow).toBeVisible();
            
            // 5c. Check that the flower name is also visible
            const nameCheck = page.locator('table').getByText(TEST_FLOWER_NAME).first();
            await expect(nameCheck).toBeVisible(); 
        });
    });
});