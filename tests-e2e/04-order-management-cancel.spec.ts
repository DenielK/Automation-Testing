import { test, expect } from '@playwright/test';

// Data for the test order that should NOT be created
const TEST_QUANTITY_TO_CANCEL = '999';
const TEST_FLOWER_NAME_TO_CANCEL = 'Test_Cancel_Flower'; 

test.describe('Admin Flow: Order Management (Cancel)', () => {

    /*
     * TEST DESCRIPTION (TC-004: Cancel Order Creation)
     * Goal: Ensure that if the "Cancel" button is clicked during order creation, the data is not saved.
     * Expectation: After clicking "Cancel," the user returns to the order list, and the test entry is absent from the table.
     */
    test('TC-004: Order data should NOT be saved if "Cancel" button is clicked', async ({ page }) => {

        // --- PRE-CONDITION: Login as Admin ---
        await test.step('PRE-CONDITION: Log in as Admin', async () => {
            await page.goto('login.php'); 
            await page.locator('[name="login"]').fill('admin');
            await page.locator('[name="pass"]').fill('admin');
            await page.locator('[type="submit"][value="Logi sisse"]').click();
            await expect(page).toHaveURL(/tellimus.php/); 
        });

        // --- Step 1: Navigate to Orders Page and start creation ---
        await test.step('1. Navigate to tellimus.php and click "Add new order"', async () => {
            await page.goto('tellimus.php'); 
            await expect(page).toHaveURL(/tellimus.php/);
            // Open the order creation form
            await page.getByRole('button', { name: 'Add new order' }).click(); 
        });
        
        // --- Step 2: Fill in the fields (Optional, but realistic) ---
        await test.step('2. Fill in the fields with unique test data', async () => {
            // Fill in fields to ensure we can verify their absence later
            await page.locator('[name="tellimus_tukk"]').fill(TEST_QUANTITY_TO_CANCEL);
            // Selecting a valid product ID
            await page.locator('[name="tellimus_toode"]').selectOption({ value: '1' });
        });

        // --- Step 3: Click "Cancel" ---
        await test.step('3. Click the "Cancel" button', async () => {
            await page.getByRole('button', { name: 'Cancel' }).click(); 
        });

        // --- Step 4: Verify the unique order data is NOT in the table ---
        await test.step('4. Verify no new order was created and page returned to the list', async () => {
            
            // 4a. Verify redirection back to tellimus.php
            await expect(page).toHaveURL(/tellimus.php/); 

            // 4b. Check that the unique quantity of the canceled order is NOT found in the table
            const canceledOrderQuantity = page.locator('table').getByText(TEST_QUANTITY_TO_CANCEL);
            await expect(canceledOrderQuantity).not.toBeVisible();

            // 4c. Check that the unique name of the canceled flower is NOT found (if applicable)
            const canceledOrderName = page.locator('table').getByText(TEST_FLOWER_NAME_TO_CANCEL);
            await expect(canceledOrderName).not.toBeVisible();
        });
    });
});