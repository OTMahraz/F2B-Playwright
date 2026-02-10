import { Page } from '@playwright/test';
import { logger } from '../../utils/logger';

/**
 * Aide pour les attentes et validations communes
 */
export class WaitHelper {
  /**
   * Attend qu'une URL spécifique soit atteinte
   */
  static async waitForUrl(page: Page, url: string, timeout = 5000): Promise<void> {
    await page.waitForURL('**' + url, { timeout });
    logger.info(`URL atteinte: ${url}`);
  }

  /**
   * Attend qu'une fonction retourne vrai
   */
  static async waitForCondition(
    condition: () => Promise<boolean>,
    timeout = 5000,
    interval = 100
  ): Promise<void> {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      if (await condition()) {
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
    throw new Error(`Condition not met within ${timeout}ms`);
  }

  /**
   * Attend plusieurs éléments
   */
  static async waitForElements(page: Page, selectors: string[]): Promise<void> {
    for (const selector of selectors) {
      await page.waitForSelector(selector);
    }
    logger.info(`${selectors.length} éléments chargés`);
  }

  /**
   * Attend qu'un élément soit supprimé
   */
  static async waitForElementToDisappear(
    page: Page,
    selector: string,
    timeout = 5000
  ): Promise<void> {
    await page.waitForSelector(selector, { state: 'hidden', timeout });
    logger.info(`Élément supprimé: ${selector}`);
  }
}
