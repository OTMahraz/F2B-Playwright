import { defineConfig, devices } from '@playwright/test';
import {BASE_URL} from './config/env.config'; 


import dotenv from 'dotenv';
dotenv.config();




/**
 * Configuration Playwright complète avec support de multiples projets,
 * reporters, et gestion des retries
 */
export default defineConfig({
  
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  
  /* Paramètres généraux */
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  
  /* Configuration des timeouts */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },

  /* Options partagées entre tous les projets */
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
  },

  /* Projets multi-navigateurs */
  projects: [
   
    {
      name: 'uat-chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // Tests mobiles
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  /* Reporters */
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
    ['list'],
    ['allure-playwright', { outputDir: 'allure-results' }],
  ],


  /* Global setup & teardown (optionnel) */
  webServer: {
    command: 'npm run dev',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },

  /* Metadonnées */
  metadata: {
    browser: process.env.BROWSER || 'chromium',
    os: process.platform,
    environment: process.env.ENVIRONMENT || 'staging',
  },
});
