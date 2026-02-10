import { Page, Locator } from '@playwright/test';
import { logger } from '../utils/logger';

/**
 * Classe de base pour tous les Page Objects
 * Fournit des méthodes communes pour les interactions
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Attend que la page soit chargée
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    logger.info('Page chargée');
  }

  /**
   * Clique sur un élément
   */
  async click(selector: string | Locator): Promise<void> {
    const locator = typeof selector === 'string' 
      ? this.page.locator(selector) 
      : selector;
    await locator.click();
    logger.debug(`Cliqué sur: ${typeof selector === 'string' ? selector : 'locator'}`);
  }

  /**
   * Remplit un champ
   */
  async fill(selector: string | Locator, text: string): Promise<void> {
    const locator = typeof selector === 'string' 
      ? this.page.locator(selector) 
      : selector;
    await locator.fill(text);
    logger.debug(`Rempli: ${typeof selector === 'string' ? selector : 'locator'} avec "${text}"`);
  }

  /**
   * Tape du texte sans effacer
   */
  async type(selector: string | Locator, text: string): Promise<void> {
    const locator = typeof selector === 'string' 
      ? this.page.locator(selector) 
      : selector;
    await locator.type(text);
  }

  /**
   * Obient la valeur d'un élément
   */
  async getValue(selector: string | Locator): Promise<string | null> {
    const locator = typeof selector === 'string' 
      ? this.page.locator(selector) 
      : selector;
    return locator.inputValue();
  }

  /**
   * Obtient le texte d'un élément
   */
  async getText(selector: string | Locator): Promise<string> {
    const locator = typeof selector === 'string' 
      ? this.page.locator(selector) 
      : selector;
    return locator.textContent() || '';
  }

  /**
   * Vérifie si un élément est visible
   */
  async isVisible(selector: string | Locator): Promise<boolean> {
    const locator = typeof selector === 'string' 
      ? this.page.locator(selector) 
      : selector;
    return locator.isVisible();
  }

  /**
   * Attend un élément puis retourne le locator
   */
  async waitForElement(selector: string, timeout = 5000): Promise<Locator> {
    const locator = this.page.locator(selector);
    await locator.waitFor({ timeout });
    return locator;
  }

  /**
   * Navigue vers une URL
   */
  async goto(url: string): Promise<void> {
    const response = await this.page.goto(url);
    logger.info(`Navigué vers: ${url}`);
  }

  /**
   * Prend une capture d'écran
   */
  async takeScreenshot(name: string): Promise<void> {
    const filename = `./test-results/screenshots/${name}.png`;
    await this.page.screenshot({ path: filename });
    logger.info(`Capture d'écran sauvegardée: ${filename}`);
  }

  /**
   * Attend X millisecondes
   */
  async waitFor(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }

  /**
   * Exécute du JavaScript dans le contexte de la page
   */
  async evaluateScript<T>(script: string): Promise<T> {
    return this.page.evaluate(script);
  }

  /**
   * Récupère l'URL actuelle
   */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /**
   * Revient à la page précédente
   */
  async goBack(): Promise<void> {
    await this.page.goBack();
    logger.info('Retour à la page précédente');
  }

  /**
   * Avance vers la page suivante
   */
  async goForward(): Promise<void> {
    await this.page.goForward();
    logger.info('Avancée vers la page suivante');
  }

  /**
   * Actualise la page
   */
  async reload(): Promise<void> {
    await this.page.reload();
    logger.info('Page actualisée');
  }
}
