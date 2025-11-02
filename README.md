FlowerShop (E2E Testing) - README

--- PROJECT OVERVIEW ---

Project: FlowerShop (E2E Testing)
This is a simple web application for managing flower products and orders. The tests run against the live online version, so no local installation (PHP, database, or server) is needed to run the tests.

- App URL: https://denielkruusman24.thkit.ee/php/finalproject/login.php

- Credentials: 
  Admin - admin/admin 
  Regular User - test /test 

--- RUNNING E2E TESTS (PLAYWRIGHT) ---

We use Playwright to automatically test the live version of the application, ensuring all key flows work correctly.

Requirements:
- Node.js (v18 or higher).
- NPM (installed with Node.js).
- Terminal (Command Prompt/PowerShell).

Passed Test Cases (7/7):
| TC      | Description                                                    |
|---------|----------------------------------------------------------------|
| TC-001  | Admin: Successful login and logout.                            |
| TC-002  | Auth: Prevent login with incorrect password.                   |
| TC-003  | Admin: Successfully create a new order.                        |
| TC-004  | Admin: Order data is NOT saved if "Cancel" button is clicked.  |
| TC-005  | Non-Admin: Successfully create a new product (test_item).      |
| TC-006  | Admin: Successful logout.                                      |
| TC-007  | Regular User: Successful login and logout.                     |

--- STEP-BY-STEP GUIDE ---

To run the tests, execute these 4 commands in your terminal inside your project folder (where the package.json file is located):

| Step | Purpose | Command |
| :--- | :--- | :--- |
| 1. Clone the Repo | Download the test code. | git clone <URL_of_your_test_repository> |
| 2. Install Dependencies | Download Playwright and other necessary packages. | npm install |
| 3. Install Browsers | Download the Chromium browser needed by Playwright. | npx playwright install |
| 4. Run the Tests! | Execute all automated tests. | npm run e2e |

--- EXTRA COMMANDS ---

| Command | Description |
| :--- | :--- |
| npm run e2e-ui | Run tests in UI Mode (for debugging). |
| npx playwright show-report | View the HTML report after tests are finished. |