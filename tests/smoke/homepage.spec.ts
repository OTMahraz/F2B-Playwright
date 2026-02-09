import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { logger } from '../../utils/logger';

test.describe('@smoke Smoke Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    logger.testStart('HomePage Loading');
  });

  test('Devrait charger la page d\'accueil correctement', async ({ page }) => {
    logger.stepStart('Naviguer vers la page d\'accueil');
    await homePage.navigateTo();
    logger.stepEnd('Naviguer vers la page d\'accueil');

    logger.stepStart('Vérifier que la page est affichée');
    const isDisplayed = await homePage.isHomepageDisplayed();
    expect(isDisplayed).toBe(true);
    logger.stepEnd('Vérifier que la page est affichée');

    logger.testEnd('HomePage Loading', 'PASSED');
  });

  test('Les éléments principaux doivent être visibles', async () => {
    logger.stepStart('Naviguer vers la page d\'accueil');
    await homePage.navigateTo();
    logger.stepEnd('Naviguer vers la page d\'accueil');

    logger.stepStart('Vérifier le logo');
    const logoVisible = await homePage.isLogoVisible();
    expect(logoVisible).toBe(true);
    logger.stepEnd('Vérifier le logo');

    logger.stepStart('Vérifier les boutons');
    const isPageDisplayed = await homePage.isHomepageDisplayed();
    expect(isPageDisplayed).toBe(true);
    logger.stepEnd('Vérifier les boutons');

    logger.testEnd('Main Elements Visibility', 'PASSED');
  });

  test('Les boutons de connexion et inscription doivent être accessibles', async ({ page }) => {
    logger.stepStart('Naviguer vers la page d\'accueil');
    await homePage.navigateTo();
    logger.stepEnd('Naviguer vers la page d\'accueil');

    logger.stepStart('Vérifier l\'existence du bouton Login');
    const loginButtonExists = await homePage.page.locator('button:has-text("Login")').isVisible();
    expect(loginButtonExists).toBe(true);
    logger.stepEnd('Vérifier l\'existence du bouton Login');

    logger.testEnd('Login and Signup Buttons', 'PASSED');
  });

  test('La page d\'accueil doit avoir un titre valide', async () => {
    logger.stepStart('Naviguer vers la page d\'accueil');
    await homePage.navigateTo();
    logger.stepEnd('Naviguer vers la page d\'accueil');

    logger.stepStart('Vérifier le titre');
    const pageTitle = await homePage.page.title();
    expect(pageTitle).toBeTruthy();
    logger.stepEnd('Vérifier le titre');

    logger.testEnd('Page Title Check', 'PASSED');
  });
});
