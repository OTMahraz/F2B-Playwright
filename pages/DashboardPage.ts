import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { logger } from '../utils/logger';

/**
 * Page Object pour le tableau de bord utilisateur
 */
export class DashboardPage extends BasePage {
  // Sélecteurs
  readonly userGreeting = '[data-testid="user-greeting"]';
  readonly userProfile = '[data-testid="user-profile"]';
  readonly logoutButton = '[data-testid="logout-button"]';
  readonly settingsButton = '[data-testid="settings-button"]';
  readonly dashboardContent = '[data-testid="dashboard-content"]';
  readonly userMenu = '[data-testid="user-menu"]';
  readonly statsPanel = '[data-testid="stats-panel"]';
  readonly activityLog = '[data-testid="activity-log"]';
  readonly navigationMenu = '[data-testid="side-nav"]';
  readonly welcomeCard = '[data-testid="welcome-card"]';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigue vers le tableau de bord
   */
  async navigateToDashboard(): Promise<void> {
    await this.goto('/dashboard');
    await this.waitForPageLoad();
    logger.info('Tableau de bord ouvert');
  }

  /**
   * Vérifie que le tableau de bord est chargé
   */
  async isDashboardLoaded(): Promise<boolean> {
    return this.isVisible(this.dashboardContent);
  }

  /**
   * Obtient le message de bienvenue
   */
  async getWelcomeMessage(): Promise<string> {
    return this.getText(this.userGreeting);
  }

  /**
   * Clique sur le menu utilisateur
   */
  async clickUserMenu(): Promise<void> {
    await this.click(this.userMenu);
    logger.info('Menu utilisateur ouvert');
  }

  /**
   * Clique sur le bouton de déconnexion
   */
  async clickLogoutButton(): Promise<void> {
    await this.click(this.logoutButton);
    logger.info('Bouton de déconnexion cliqué');
  }

  /**
   * Accède aux paramètres
   */
  async goToSettings(): Promise<void> {
    await this.click(this.settingsButton);
    logger.info('Page des paramètres ouverte');
  }

  /**
   * Obtient les informations du profil utilisateur
   */
  async getUserProfileInfo(): Promise<string> {
    return this.getText(this.userProfile);
  }

  /**
   * Vérifie que le panneau de statistiques est visible
   */
  async isStatsPanelVisible(): Promise<boolean> {
    return this.isVisible(this.statsPanel);
  }

  /**
   * Vérifie que le journal d'activité est visible
   */
  async isActivityLogVisible(): Promise<boolean> {
    return this.isVisible(this.activityLog);
  }

  /**
   * Navigue via le menu de navigation
   */
  async navigateViaMenu(menuItem: string): Promise<void> {
    await this.click(this.navigationMenu);
    await this.click(`${this.navigationMenu} >> text=${menuItem}`);
    logger.info(`Navigué vers: ${menuItem}`);
  }

  /**
   * Se déconnecte
   */
  async logout(): Promise<void> {
    await this.clickUserMenu();
    await this.clickLogoutButton();
    logger.info('Utilisateur déconnecté');
  }

  /**
   * Attend que le tableau de bord soit prêt
   */
  async waitForDashboardReady(): Promise<void> {
    await this.waitForElement(this.dashboardContent);
    await this.waitForElement(this.userGreeting);
    logger.info('Tableau de bord prêt');
  }

  /**
   * Vérifie que le message de bienvenue contient un texte spécifique
   */
  async verifyWelcomeMessage(expectedText: string): Promise<boolean> {
    const message = await this.getWelcomeMessage();
    return message.includes(expectedText);
  }
}
