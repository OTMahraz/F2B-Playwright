import { Page } from '@playwright/test';

/**
 * Classe pour gérer l'authentification dans les tests
 */
export class AuthHelper {
  /**
   * Effectue une connexion via l'API (plus rapide que l'UI)
   */
  static async loginViaAPI(
    page: Page,
    email: string,
    password: string,
    apiBaseUrl: string
  ): Promise<string> {
    const response = await page.request.post(`${apiBaseUrl}/auth/login`, {
      data: { email, password },
    });

    const data = await response.json();
    return data.token;
  }

  /**
   * Stocke le token dans le localStorage
   */
  static async setAuthToken(page: Page, token: string): Promise<void> {
    await page.evaluate((token) => {
      localStorage.setItem('authToken', token);
    }, token);
  }

  /**
   * Récupère le token du localStorage
   */
  static async getAuthToken(page: Page): Promise<string | null> {
    return page.evaluate(() => localStorage.getItem('authToken'));
  }

  /**
   * Efface le token
   */
  static async clearAuthToken(page: Page): Promise<void> {
    await page.evaluate(() => {
      localStorage.removeItem('authToken');
    });
  }

  /**
   * Vérifie si l'utilisateur est connecté
   */
  static async isUserLoggedIn(page: Page): Promise<boolean> {
    const token = await this.getAuthToken(page);
    return !!token;
  }
}
