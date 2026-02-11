import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { logger } from '../utils/logger';
//import type { UserCredentials } from '../fixtures/users'; 
import type { UserCredentials } from '../config/roles.config';

/**
 * Page Object pour la page de connexion
 */
export class LoginPage extends BasePage {
  readonly username: Locator;
  readonly password: Locator;
  readonly submit: Locator;

  constructor(page: Page) {
    super(page);

    // Définition des locators (id à adapter selon  HTML )
    this.username = page.locator('#username');
    this.password = page.locator('#password');
    this.submit   = page.locator('button[type="submit"]');
  }

  async login(user: UserCredentials): Promise<void> {
    logger.info(`Login avec l'utilisateur : ${user.username}`);

    await this.username.fill(user.username);
    await this.password.fill(user.password);
    await this.submit.click();
  }
}
