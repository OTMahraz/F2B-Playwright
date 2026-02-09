import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { testData } from '../../fixtures/test-data';
import { logger } from '../../utils/logger';
import { WaitHelper } from '../helpers/WaitHelper';

test.describe('@regression Regression Tests', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    logger.info('Test de régression initialisé');
  });

  test('Devrait parcourir le flux complet: Accueil -> Login -> Dashboard', async ({ page }) => {
    logger.testStart('Complete User Flow');
    
    logger.stepStart('Charger la page d\'accueil');
    await homePage.navigateTo();
    const homePageLoaded = await homePage.isHomepageDisplayed();
    expect(homePageLoaded).toBe(true);
    logger.stepEnd('Charger la page d\'accueil');

    logger.stepStart('Cliquer sur le bouton de connexion');
    await homePage.clickLoginButton();
    await page.waitForURL('**/login', { timeout: 5000 });
    logger.stepEnd('Cliquer sur le bouton de connexion');

    logger.stepStart('Remplir le formulaire de connexion');
    const loginPageReady = await loginPage.isLoginPageDisplayed();
    expect(loginPageReady).toBe(true);
    await loginPage.login(testData.validUser.email, testData.validUser.password);
    logger.stepEnd('Remplir le formulaire de connexion');

    logger.stepStart('Attendre la redirection vers le dashboard');
    await page.waitForURL('**/dashboard', { timeout: 10000 });
    const dashboardLoaded = await dashboardPage.isDashboardLoaded();
    expect(dashboardLoaded).toBe(true);
    logger.stepEnd('Attendre la redirection vers le dashboard');

    logger.testEnd('Complete User Flow', 'PASSED');
  });

  test('Devrait vérifier la navigation dans le dashboard', async ({ page }) => {
    logger.testStart('Dashboard Navigation');
    
    logger.stepStart('Se connecter et accéder au dashboard');
    await loginPage.navigateToLogin();
    await loginPage.login(testData.validUser.email, testData.validUser.password);
    await page.waitForURL('**/dashboard', { timeout: 10000 });
    logger.stepEnd('Se connecter et accéder au dashboard');

    logger.stepStart('Vérifier que le contenu du dashboard est visible');
    const isDashboardReady = await dashboardPage.isDashboardLoaded();
    expect(isDashboardReady).toBe(true);
    logger.stepEnd('Vérifier que le contenu du dashboard est visible');

    logger.stepStart('Vérifier le message de bienvenue');
    const message = await dashboardPage.getWelcomeMessage();
    expect(message).toBeTruthy();
    logger.stepEnd('Vérifier le message de bienvenue');

    logger.testEnd('Dashboard Navigation', 'PASSED');
  });

  test('Devrait gérer la navigation arrière et avant', async ({ page }) => {
    logger.testStart('Browser Navigation');
    
    logger.stepStart('Charger la page d\'accueil');
    await homePage.navigateTo();
    logger.stepEnd('Charger la page d\'accueil');

    logger.stepStart('Naviguer vers le login');
    await homePage.clickLoginButton();
    await page.waitForURL('**/login', { timeout: 5000 });
    logger.stepEnd('Naviguer vers le login');

    logger.stepStart('Revenir à l\'accueil');
    await homePage.goBack();
    await page.waitForURL('**/');
    const homePageAgain = await homePage.isHomepageDisplayed();
    expect(homePageAgain).toBe(true);
    logger.stepEnd('Revenir à l\'accueil');

    logger.stepStart('Avancer vers la page de login');
    await homePage.goForward();
    const isLoginPage = await loginPage.isLoginPageDisplayed();
    expect(isLoginPage).toBe(true);
    logger.stepEnd('Avancer vers la page de login');

    logger.testEnd('Browser Navigation', 'PASSED');
  });

  test('Devrait vérifier la cohérence de l\'UI lors du changement de pages', async ({ page }) => {
    logger.testStart('UI Consistency Check');
    
    logger.stepStart('Vérifier la navigation sur la page d\'accueil');
    await homePage.navigateTo();
    const navBarVisible = await homePage.isHomepageDisplayed();
    expect(navBarVisible).toBe(true);
    logger.stepEnd('Vérifier la navigation sur la page d\'accueil');

    logger.stepStart('Se connecter');
    await homePage.clickLoginButton();
    await page.waitForURL('**/login', { timeout: 5000 });
    await loginPage.login(testData.validUser.email, testData.validUser.password);
    await page.waitForURL('**/dashboard', { timeout: 10000 });
    logger.stepEnd('Se connecter');

    logger.stepStart('Vérifier les éléments du dashboard');
    const statsVisible = await dashboardPage.isStatsPanelVisible();
    const activityVisible = await dashboardPage.isActivityLogVisible();
    expect(statsVisible || activityVisible).toBe(true);
    logger.stepEnd('Vérifier les éléments du dashboard');

    logger.testEnd('UI Consistency Check', 'PASSED');
  });

  test('Devrait vérifier la stabilité du login avec plusieurs tentatives', async ({ page }) => {
    logger.testStart('Login Stability');
    
    for (let i = 0; i < 3; i++) {
      logger.stepStart(`Tentative de connexion ${i + 1}`);
      await loginPage.navigateToLogin();
      const isLoginPageReady = await loginPage.isLoginPageDisplayed();
      expect(isLoginPageReady).toBe(true);
      await loginPage.resetForm();
      logger.stepEnd(`Tentative de connexion ${i + 1}`);
    }

    logger.testEnd('Login Stability', 'PASSED');
  });
});
