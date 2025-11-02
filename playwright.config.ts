import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 60000,
  workers: 1, 

  use: {
    baseURL: 'https://denielkruusman24.thkit.ee/php/finalproject/login.php',
    trace: 'on-first-retry'
  },
  testDir: './tests-e2e',
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});