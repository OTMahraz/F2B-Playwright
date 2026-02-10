import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { testData } from '../../fixtures/test-data';
import { logger } from '../../utils/logger';
import { AuthHelper } from '../helpers/AuthHelper';

test.describe('@e2e Authentification E2E', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    logger.info('Test E2E d\'authentification initialisé');
  });

  test('Devrait se connecter avec des identifiants valides', async ({ page }) => {
    logger.testStart('Login with Valid Credentials');
    
    logger.stepStart('Naviguer vers la page de login');
    await loginPage.navigateToLogin();
    logger.stepEnd('Naviguer vers la page de login');

    logger.stepStart('Vérifier que le formulaire de login est affiché');
    const isLoginPageDisplayed = await loginPage.isLoginPageDisplayed();
    expect(isLoginPageDisplayed).toBe(true);
    logger.stepEnd('Vérifier que le formulaire de login est affiché');

    logger.stepStart('Remplir et soumettre le formulaire de connexion');
    await loginPage.login(testData.validUser.email, testData.validUser.password);
    logger.stepEnd('Remplir et soumettre le formulaire de connexion');

    logger.stepStart('Attendre la redirection vers le tableau de bord');
    await page.waitForURL('**/dashboard', { timeout: 10000 });
    const isDashboardLoaded = await dashboardPage.isDashboardLoaded();
    expect(isDashboardLoaded).toBe(true);
    logger.stepEnd('Attendre la redirection vers le tableau de bord');

    logger.testEnd('Login with Valid Credentials', 'PASSED');
  });

  test('Devrait afficher une erreur avec des identifiants invalides', async ({ page }) => {
    logger.testStart('Login with Invalid Credentials');
    
    logger.stepStart('Naviguer vers la page de login');
    await loginPage.navigateToLogin();
    logger.stepEnd('Naviguer vers la page de login');

    logger.stepStart('Entrer des identifiants invalides');
    await loginPage.login(testData.invalidCredentials.email, testData.invalidCredentials.password);
    logger.stepEnd('Entrer des identifiants invalides');

    logger.stepStart('Vérifier l\'affichage du message d\'erreur');
    await page.waitForTimeout(1000);
    const isErrorDisplayed = await loginPage.isErrorMessageDisplayed();
    expect(isErrorDisplayed).toBe(true);
    logger.stepEnd('Vérifier l\'affichage du message d\'erreur');

    logger.testEnd('Login with Invalid Credentials', 'PASSED');
  });

  test('Devrait permettre la déconnexion depuis le tableau de bord', async ({ page }) => {
    logger.testStart('Logout from Dashboard');
    
    logger.stepStart('Se connecter');
    await loginPage.navigateToLogin();
    await loginPage.login(testData.validUser.email, testData.validUser.password);
    await page.waitForURL('**/dashboard', { timeout: 10000 });
    logger.stepEnd('Se connecter');

    logger.stepStart('Cliquer sur le menu utilisateur');
    await dashboardPage.clickUserMenu();
    logger.stepEnd('Cliquer sur le menu utilisateur');

    logger.stepStart('Se déconnecter');
    await dashboardPage.clickLogoutButton();
    await page.waitForURL('**/login', { timeout: 10000 });
    logger.stepEnd('Se déconnecter');

    logger.stepStart('Vérifier la redirection vers login');
    const isLoginPageDisplayed = await loginPage.isLoginPageDisplayed();
    expect(isLoginPageDisplayed).toBe(true);
    logger.stepEnd('Vérifier la redirection vers login');

    logger.testEnd('Logout from Dashboard', 'PASSED');
  });

  test('Devrait valider le formulaire avant la soumission', async ({ page }) => {
    logger.testStart('Form Validation');
    
    logger.stepStart('Naviguer vers le login');
    await loginPage.navigateToLogin();
    logger.stepEnd('Naviguer vers le login');

    logger.stepStart('Soumettre le formulaire vide');
    await loginPage.clickLoginButton();
    logger.stepEnd('Soumettre le formulaire vide');

    logger.stepStart('Vérifier que nous sommes toujours sur la page de login');
    const isStillOnLoginPage = await loginPage.isLoginPageDisplayed();
    expect(isStillOnLoginPage).toBe(true);
    logger.stepEnd('Vérifier que nous sommes toujours sur la page de login');

    logger.testEnd('Form Validation', 'PASSED');
  });
});
