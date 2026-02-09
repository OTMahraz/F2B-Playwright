import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
  nodeEnv: string;
  environment: string;
  baseUrl: string;
  apiBaseUrl: string;
  testUserEmail: string;
  testUserPassword: string;
  testAdminEmail: string;
  testAdminPassword: string;
  browser: string;
  headless: boolean;
  slowMo: number;
  timeout: number;
  logLevel: string;
  allureEnabled: boolean;
  screenshotsOnFailure: boolean;
  videoOnRetry: boolean;
}

/**
 * Configuration centralisée des variables d'environnement
 */
const env: EnvConfig = {
  nodeEnv: process.env.NODE_ENV || 'development',
  environment: process.env.ENVIRONMENT || 'staging',
  baseUrl: process.env.BASE_URL || 'https://staging.example.com',
  apiBaseUrl: process.env.API_BASE_URL || 'https://api.staging.example.com',
  testUserEmail: process.env.TEST_USER_EMAIL || 'test.user@example.com',
  testUserPassword: process.env.TEST_USER_PASSWORD || 'TestPassword123!',
  testAdminEmail: process.env.TEST_ADMIN_EMAIL || 'admin@example.com',
  testAdminPassword: process.env.TEST_ADMIN_PASSWORD || 'AdminPassword123!',
  browser: process.env.BROWSER || 'chromium',
  headless: process.env.HEADLESS !== 'false',
  slowMo: parseInt(process.env.SLOW_MO || '0', 10),
  timeout: parseInt(process.env.TIMEOUT || '30000', 10),
  logLevel: process.env.LOG_LEVEL || 'info',
  allureEnabled: process.env.ALLURE_ENABLED !== 'false',
  screenshotsOnFailure: process.env.SCREENSHOTS_ON_FAILURE !== 'false',
  videoOnRetry: process.env.VIDEO_ON_RETRY !== 'false',
};

export default env;
