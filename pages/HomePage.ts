import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { logger } from '../utils/logger';

/**
 * Page Object pour la page d'accueil
 */
export class HomePage extends BasePage {
  // Sélecteurs
  readonly loginButton = 'button:has-text("Login")';
  readonly signupButton = 'button:has-text("Sign Up")';
  readonly navigationBar = '[data-testid="navbar"]';
  readonly logo = '[data-testid="logo"]';
  readonly welcomeMessage = '[data-testid="welcome-message"]';
  readonly featuresSection = '[data-testid="features"]';
  readonly headerTitle = 'h1';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigue vers la page d'accueil
   */
  async navigateTo(): Promise<void> {
    await this.goto('/');
    await this.waitForPageLoad();
    logger.info('Accueil page ouverte');
  }

  /**
   * Clique sur le bouton de connexion
   */
  async clickLoginButton(): Promise<void> {
    await this.click(this.loginButton);
    logger.info('Bouton de connexion cliqué');
  }

  /**
   * Clique sur le bouton d'inscription
   */
  async clickSignupButton(): Promise<void> {
    await this.click(this.signupButton);
    logger.info('Bouton d\'inscription cliqué');
  }

  /**
   * Vérifie que la page d'accueil est affichée
   */
  async isHomepageDisplayed(): Promise<boolean> {
    return this.isVisible(this.navigationBar);
  }

  /**
   * Vérifie que le message de bienvenue est affiché
   */
  async isWelcomeMessageDisplayed(): Promise<boolean> {
    return this.isVisible(this.welcomeMessage);
  }

  /**
   * Obtient le titre de la page
   */
  async getPageTitle(): Promise<string> {
    return this.getText(this.headerTitle);
  }

  /**
   * Vérifie que la section des fonctionnalités est visible
   */
  async isFeaturesVisible(): Promise<boolean> {
    return this.isVisible(this.featuresSection);
  }

  /**
   * Scrolle vers la section des fonctionnalités
   */
  async scrollToFeatures(): Promise<void> {
    await this.page.locator(this.featuresSection).scrollIntoViewIfNeeded();
    logger.info('Section des fonctionnalités visible');
  }

  /**
   * Vérifie que le logo est visible
   */
  async isLogoVisible(): Promise<boolean> {
    return this.isVisible(this.logo);
  }
}
