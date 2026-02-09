# 🎭 Framework d'Automatisation Playwright - Documentation Complète

## 📋 Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Installation](#installation)
3. [Structure du projet](#structure-du-projet)
4. [Configuration](#configuration)
5. [Page Objects (POM)](#page-objects-pom)
6. [Écriture des tests](#écriture-des-tests)
7. [Exécution des tests](#exécution-des-tests)
8. [Rapports et résultats](#rapports-et-résultats)
9. [Bonnes pratiques](#bonnes-pratiques)
10. [Dépannage](#dépannage)

---

## 🎯 Vue d'ensemble

Ce framework Playwright est une solution **enterprise-ready** pour l'automatisation des tests. Il suit les meilleures pratiques de l'industrie avec :

- ✅ Architecture modulaire et scalable
- ✅ Page Object Model (POM) pour une maintenance facile
- ✅ Tests structurés (Smoke, E2E, API, Regression)
- ✅ Gestion centralisée de la configuration
- ✅ Logger personnalisé
- ✅ Support multi-navigateurs (Chrome, Firefox, Safari)
- ✅ Rapports Allure et HTML
- ✅ Screenshots et vidéos automatiques
- ✅ Gestion des environnements (staging, production)

---

## 🚀 Installation

### Prérequis
- **Node.js** >= 18.x
- **npm** >= 9.x ou **yarn**
- Git (optionnel)

### Étapes d'installation

1. **Cloner le projet ou naviguer vers le répertoire**
   ```bash
   cd F2B-Playwright
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Installer les navigateurs Playwright**
   ```bash
   npx playwright install
   ```

4. **Configurer les variables d'environnement**
   ```bash
   cp .env.example .env
   # Éditer .env avec vos configurations
   ```

5. **Vérifier l'installation**
   ```bash
   npm test -- --list
   ```

---

## 📁 Structure du projet

```
F2B-Playwright/
├── pages/                      # Page Objects
│   ├── BasePage.ts            # Classe de base avec méthodes communes
│   ├── HomePage.ts            # Page Object pour l'accueil
│   ├── LoginPage.ts           # Page Object pour la connexion
│   └── DashboardPage.ts       # Page Object pour le tableau de bord
│
├── tests/                      # Tests
│   ├── smoke/                 # Tests de base (rapides)
│   │   └── homepage.spec.ts
│   ├── e2e/                   # Tests de bout en bout
│   │   └── auth.spec.ts
│   ├── api/                   # Tests API
│   │   └── api.spec.ts
│   ├── regression/            # Tests de régression
│   │   └── ui-regression.spec.ts
│   └── helpers/               # Utilitaires de test
│       ├── AuthHelper.ts
│       └── WaitHelper.ts
│
├── utils/                      # Utilitaires
│   ├── env.ts                 # Gestion des variables d'environnement
│   ├── logger.ts              # Logger personnalisé
│   └── apiClient.ts           # Client API centralisé
│
├── fixtures/                   # Données de test
│   ├── test-data.ts           # Données en TypeScript
│   └── test-data.json         # Données en JSON
│
├── reports/                    # Rapports générés
│   ├── allure-results/        # Résultats Allure
│   └── playwright-report/     # Rapports HTML
│
├── playwright.config.ts       # Configuration Playwright
├── tsconfig.json              # Configuration TypeScript
├── package.json               # Dépendances et scripts
├── .env                       # Variables d'environnement (local)
├── .env.example               # Template .env
├── .gitignore                 # Fichiers à ignorer
└── README.md                  # Ce fichier
```

---

## ⚙️ Configuration

### playwright.config.ts

Le fichier `playwright.config.ts` contient la configuration principale :

```typescript
// Projets multi-navigateurs
projects: [
  { name: 'chromium' },
  { name: 'firefox' },
  { name: 'webkit' },
  { name: 'Mobile Chrome' },
  { name: 'Mobile Safari' }
]

// Reporters
reporter: ['html', 'json', 'junit', 'allure-playwright']

// Retries
retries: process.env.CI ? 2 : 0

// Timeouts
timeout: 30 * 1000
expect.timeout: 5000
```

### Variables d'environnement (.env)

```env
NODE_ENV=development
ENVIRONMENT=staging
BASE_URL=https://staging.example.com
API_BASE_URL=https://api.staging.example.com
TEST_USER_EMAIL=testuser@example.com
TEST_USER_PASSWORD=TestPassword123!
BROWSER=chromium
HEADLESS=true
LOG_LEVEL=info
ALLURE_ENABLED=true
SCREENSHOTS_ON_FAILURE=true
VIDEO_ON_RETRY=true
```

---

## 📄 Page Objects (POM)

### Structure d'un Page Object

```typescript
import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Sélecteurs
  readonly emailInput = '[data-testid="email-input"]';
  readonly submitButton = '[data-testid="submit"]';

  constructor(page: Page) {
    super(page);
  }

  // Méthodes d'action
  async login(email: string, password: string): Promise<void> {
    await this.fill(this.emailInput, email);
    // ... actions supplémentaires ...
  }

  // Méthodes de vérification
  async isLoginPageDisplayed(): Promise<boolean> {
    return this.isVisible(this.emailInput);
  }
}
```

### Exemple complet : LoginPage

```typescript
// pages/LoginPage.ts
export class LoginPage extends BasePage {
  readonly emailInput = 'input[name="email"]';
  readonly passwordInput = 'input[name="password"]';
  readonly loginButton = 'button[type="submit"]';

  async login(email: string, password: string): Promise<void> {
    await this.fill(this.emailInput, email);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  async getErrorMessage(): Promise<string> {
    return this.getText('[role="alert"]');
  }
}
```

---

## ✍️ Écriture des tests

### Structure de base d'un test

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { logger } from '../../utils/logger';

test.describe('@smoke My Test Suite', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('should login successfully', async ({ page }) => {
    logger.testStart('Login Test');
    
    logger.stepStart('Navigate to login');
    await loginPage.navigateToLogin();
    logger.stepEnd('Navigate to login');

    logger.stepStart('Perform login');
    await loginPage.login('user@example.com', 'password');
    logger.stepEnd('Perform login');

    logger.stepStart('Verify success');
    expect(page.url()).toContain('dashboard');
    logger.stepEnd('Verify success');

    logger.testEnd('Login Test', 'PASSED');
  });
});
```

### Tags de test

Utilisez les tags pour organiser les tests :

```typescript
test.describe('@smoke Tests rapides', () => {
  // Tests de base
});

test.describe('@e2e Scénarios complets', () => {
  // Tests de bout en bout
});

test.describe('@api Tests API', () => {
  // Tests API
});

test.describe('@regression Tests de régression', () => {
  // Tests approfondis
});
```

---

## 🏃 Exécution des tests

### Scripts npm disponibles

```bash
# Tous les tests
npm test

# Mode UI (interactif)
npm run test:ui

# Tests Smoke uniquement
npm run test:smoke

# Tests E2E
npm run test:e2e

# Tests API
npm run test:api

# Tests Regression
npm run test:regression

# Mode headed (affiche le navigateur)
npm run test:headed

# Mode debug (permet de parcourir le code)
npm run test:debug

# Afficher le rapport HTML
npm run test:reporter
```

### Commandes Playwright directes

```bash
# Exécuter un fichier spécifique
npx playwright test tests/smoke/

# Exécuter un test spécifique
npx playwright test -g "should login successfully"

# Exécuter sur un navigateur spécifique
npx playwright test --project=firefox

# Mode headed avec retrace
npx playwright test --headed --trace=on

# Avec configuration de timeout personnalisée
npx playwright test --timeout=60000
```

---

## 📊 Rapports et résultats

### HTML Reporter

Les rapports sont générés automatiquement dans `playwright-report/`

```bash
npm run test:reporter
```

### Allure Reporter

Pour générer les rapports Allure :

```bash
npm run report:allure
```

Cela génère un rapport interactif dans `allure-report/`

### Artifacts générés

Après chaque exécution :

- `playwright-report/` - Rapport HTML complet
- `test-results/results.json` - Résultats en JSON
- `test-results/results.xml` - Résultats en JUnit XML (CI/CD)
- `allure-results/` - Résultats pour Allure
- `test-results/screenshots/` - Captures d'écran (si échecs)
- `test-results/videos/` - Vidéos (si retries)

---

## 💡 Bonnes pratiques

### 1. Utiliser les sélecteurs robustes

✅ **BON** - Utiliser data-testid
```typescript
readonly loginButton = '[data-testid="login-button"]';
```

❌ **MAUVAIS** - CSS génériques
```typescript
readonly loginButton = 'button:nth-child(3)';
```

### 2. Écrire des tests indépendants

Chaque test doit pouvoir s'exécuter isolément :

```typescript
test.beforeEach(async ({ page }) => {
  // Réinitialiser l'état avant chaque test
  await page.goto('/');
});
```

### 3. Utiliser les Page Objects

```typescript
// ✅ BON - Avec Page Object
const loginPage = new LoginPage(page);
await loginPage.login(email, password);

// ❌ MAUVAIS - Code en dur
await page.click('button');
await page.fill('input', email);
```

### 4. Ajouter des logs détaillés

```typescript
logger.stepStart('Étape importante');
// ... code ...
logger.stepEnd('Étape importante');
```

### 5. Gérer les timeouts explicitement

```typescript
// Attendre un élément spécifique
await page.waitForSelector('[data-testid="loader"]', { 
  state: 'hidden',
  timeout: 10000 
});
```

### 6. Éviter les sleep() sauf si nécessaire

```typescript
// ✅ BON - Attendre un élément
await page.waitForSelector('[data-testid="confirmation"]');

// ❌ MAUVAIS - Attendre aveuglément
await page.waitForTimeout(5000);
```

### 7. Utiliser des fixtures pour les données

```typescript
import { testData } from '../../fixtures/test-data';

await loginPage.login(
  testData.validUser.email,
  testData.validUser.password
);
```

### 8. Nommer les tests explicitement

```typescript
// ✅ BON - Clair et descriptif
test('should display error when login with invalid credentials');

// ❌ MAUVAIS - Vague
test('login test');
```

---

## 🔧 Dépannage

### Les tests ne trouvent pas les éléments

**Problème** : `locator.click: Unexpected token < in JSON at position 0`

**Solutions** :
1. Vérifier les sélecteurs avec `npx playwright codegen URL`
2. Utiliser les data-testid plutôt que les CSS génériques
3. Attendre que l'élément soit attaché au DOM

```typescript
await page.waitForSelector('[data-testid="element"]');
```

### Timeouts

**Problème** : `Timeout waiting for element`

**Solutions** :
```typescript
// Augmenter le timeout
await page.waitForSelector(selector, { timeout: 30000 });

// Ou réduire si l'élément devrait être rapide
await page.locator(selector).waitFor({ timeout: 3000 });
```

### AuthZ issues

**Problème** : Impossible de se connecter

**Solutions** :
1. Vérifier les credentials dans `.env`
2. Vérifier que le serveur backend tourne
3. Utiliser AuthHelper pour les logins via API (plus rapide)

### Screenshots et vidéos manquants

Si les artifacts ne sont pas générés :

```typescript
// playwright.config.ts
use: {
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
}
```

### Allure Reporter ne génère pas de rapport

```bash
# Installer allure CLI
npm install -g allure-commandline

# Générer le rapport
allure generate ./allure-results --clean -o ./allure-report
allure open ./allure-report
```

---

## 📈 Intégration CI/CD

### GitHub Actions

Voir `.github/workflows/playwright.yml` pour l'exemple complet.

```yaml
name: Playwright Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npx playwright install
      - run: npm test
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## 🎓 Ressources

- [Documentation Playwright officielle](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Guide](https://playwright.dev/docs/debug)
- [Page Object Model](https://playwright.dev/docs/pom)

---

## 📞 Support

Pour toute question ou problème :

1. Consulter la [documentation Playwright](https://playwright.dev)
2. Vérifier les logs dans le terminal
3. Activer le mode debug : `npx playwright test --debug`
4. Utiliser le code generator : `npx playwright codegen URL`

---

## 📝 Changelog

### v1.0.0 (2026-02-09)
- ✅ Structure complète du framework
- ✅ Page Objects pour HomePage, LoginPage, DashboardPage
- ✅ Tests d'exemple (Smoke, E2E, API, Regression)
- ✅ Logger personnalisé
- ✅ Gestion des configurations
- ✅ Support Allure et HTML reports
- ✅ Documentation complète

---

**Bon test ! 🎭🚀**
