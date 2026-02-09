import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { logger } from '../utils/logger';

/**
 * Page Object pour la page de connexion
 */
export class LoginPage extends BasePage {
  // Sélecteurs
  readonly emailInput = '[data-testid="email-input"]';
  readonly passwordInput = '[data-testid="password-input"]';
  readonly loginButton = '[data-testid="login-button"]';
  readonly rememberMeCheckbox = '[data-testid="remember-me"]';
  readonly forgotPasswordLink = 'a:has-text("Forgot Password")';
  readonly errorMessage = '[data-testid="error-message"]';
  readonly successMessage = '[data-testid="success-message"]';
  readonly pageTitle = 'h1';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigue vers la page de login
   */
  async navigateToLogin(): Promise<void> {
    await this.goto('/login');
    await this.waitForPageLoad();
    logger.info('Page de connexion ouverte');
  }

  /**
   * Remplit le formulaire de connexion
   */
  async fillLoginForm(email: string, password: string): Promise<void> {
    logger.stepStart('Remplir le formulaire de connexion');
    await this.fill(this.emailInput, email);
    await this.fill(this.passwordInput, password);
    logger.stepEnd('Remplir le formulaire de connexion');
  }

  /**
   * Se connecte avec email et mot de passe
   */
  async login(email: string, password: string): Promise<void> {
    await this.fillLoginForm(email, password);
    await this.clickLoginButton();
    logger.info(`Connecté avec: ${email}`);
  }

  /**
   * Clique sur le bouton de connexion
   */
  async clickLoginButton(): Promise<void> {
    await this.click(this.loginButton);
    logger.info('Bouton de connexion cliqué');
  }

  /**
   * Clique sur le lien "Mot de passe oublié"
   */
  async clickForgotPasswordLink(): Promise<void> {
    await this.click(this.forgotPasswordLink);
    logger.info('Lien "Mot de passe oublié" cliqué');
  }

  /**
   * Coche la case "Se souvenir de moi"
   */
  async checkRememberMe(): Promise<void> {
    await this.click(this.rememberMeCheckbox);
    logger.info('Case "Se souvenir de moi" cochée');
  }

  /**
   * Obtient le message d'erreur affiché
   */
  async getErrorMessage(): Promise<string> {
    return this.getText(this.errorMessage);
  }

  /**
   * Obtient le message de succès affiché
   */
  async getSuccessMessage(): Promise<string> {
    return this.getText(this.successMessage);
  }

  /**
   * Vérifie que la page de connexion est affichée
   */
  async isLoginPageDisplayed(): Promise<boolean> {
    return this.isVisible(this.emailInput);
  }

  /**
   * Vérifie que le message d'erreur est affiché
   */
  async isErrorMessageDisplayed(): Promise<boolean> {
    return this.isVisible(this.errorMessage);
  }

  /**
   * Vérifie que le message de succès est affiché
   */
  async isSuccessMessageDisplayed(): Promise<boolean> {
    return this.isVisible(this.successMessage);
  }

  /**
   * Veille à ce que le formulaire soit prêt (tous les champs visibles)
   */
  async waitForLoginFormReady(): Promise<void> {
    await this.waitForElement(this.emailInput);
    await this.waitForElement(this.passwordInput);
    await this.waitForElement(this.loginButton);
    logger.info('Formulaire de connexion prêt');
  }

  /**
   * Réinitialise le formulaire
   */
  async resetForm(): Promise<void> {
    await this.fill(this.emailInput, '');
    await this.fill(this.passwordInput, '');
    logger.info('Formulaire réinitialisé');
  }
}
