# 🎯 Best Practices pour l'Automatisation Playwright

Guide complet des meilleures pratiques pour écrire des tests maintenables et fiables.

## Table des matières

1. [Architecture](#architecture)
2. [Sélecteurs](#sélecteurs)
3. [Attentes vs Assertions](#attentes-vs-assertions)
4. [Gestion des données](#gestion-des-données)
5. [Logs et Debugging](#logs-et-debugging)
6. [Maintenabilité](#maintenabilité)
7. [Performance](#performance)
8. [Sécurité](#sécurité)

---

## 🏗️ Architecture

### 1. Utiliser le Page Object Model (POM)

```typescript
// ✅ BON - Structure claire et réutilisable
export class CheckoutPage extends BasePage {
  readonly cartButton = '[data-testid="cart-btn"]';
  readonly proceedButton = '[data-testid="proceed"]';

  async proceedToCheckout(): Promise<void> {
    await this.click(this.proceedButton);
  }
}

// Test utilisant le POM
test('should proceed to checkout', async ({ page }) => {
  const checkout = new CheckoutPage(page);
  await checkout.proceedToCheckout();
});
```

### 2. Hiérarchie des tests

Organisez les tests par type et domaine :

```
tests/
├── smoke/          # Tests rapides (< 5 min)
├── e2e/            # Scénarios complets utilisateur
├── api/            # Tests API
├── regression/     # Tests approfondis
└── helpers/        # Utilitaires partagés
```

### 3. Configuration centralisée

Tous les paramètres dans `utils/env.ts` :

```typescript
// ✅ BON
import env from '../../utils/env';
const baseUrl = env.baseUrl;

// ❌ MAUVAIS
const baseUrl = 'https://hardcoded.example.com';
```

---

## 🎯 Sélecteurs

### 1. Hiérarchie des sélecteurs (dans l'ordre de préférence)

```typescript
// 1️⃣ MEILLEUR - data-testid (explicite et stable)
readonly submitButton = '[data-testid="submit"]';

// 2️⃣ BON - aria-label ou role
readonly dialog = '[aria-label="Confirmation"]';
readonly button = 'button[type="submit"]';

// 3️⃣ ACCEPTABLE - class stable
readonly form = '.checkout-form';

// 4️⃣ MAUVAIS - XPath fragile
readonly label = '//*[@class="invalid"]';

// 5️⃣ TRÈS MAUVAIS - nth-child
readonly button = 'button:nth-child(3)';
```

### 2. Sélecteurs robustes

```typescript
// ✅ BON - Spécifique et stable
readonly emailInput = 'input[data-testid="email"]';
readonly loginButton = 'button[data-testid="login"]';

// ❌ MAUVAIS - Trop générique ou fragile
readonly input = 'input';  // Peut changer d'ordre
readonly btn = '.btn';      // Trop général
```

### 3. Composition de sélecteurs

```typescript
// ✅ BON - Sélecteurs composables
class UserMenu extends BasePage {
  readonly menuContainer = '[data-testid="user-menu"]';
  readonly logoutItem = `${this.menuContainer} >> [data-testid="logout"]`;

  async logout(): Promise<void> {
    await this.click(this.logoutItem);
  }
}

// ❌ MAUVAIS - Sélecteurs implicites
readonly logoutButton = 'div > ul > li:nth-child(5) > a';
```

---

## ⏳ Attentes vs Assertions

### 1. Utiliser les bonnes méthodes d'attente

```typescript
// ✅ CORRECT - Attend un élément avant action
await page.waitForSelector('[data-testid="loader"]', { state: 'hidden' });

// ✅ CORRECT - Locator attend implicitement
await page.locator('[data-testid="button"]').click();

// ❌ MAUVAIS - Sleep aveugle
await page.waitForTimeout(3000);
```

### 2. Assertions explicites

```typescript
// ✅ BON - Assertions claires
expect(await page.locator('[role="alert"]').textContent())
  .toContain('Error');

// ✅ BON - Vérification de visibilité
await expect(page.locator('[data-testid="modal"]'))
  .toBeVisible();

// ✅ BON - Vérification d'état
await expect(page.locator('button')).toBeEnabled();

// ❌ MAUVAIS - Assertions vagues
expect(page).toBeTruthy();
```

### 3. Timeouts explicites

```typescript
// ✅ BON - Timeout adapté pour les API lentes
await page.waitForSelector('[data-testid="data"]', {
  timeout: 10000  // 10 secondes pour une API
});

// ✅ BON - Timeout court pour UI rapide
await page.locator('[data-testid="button"]').click({
  timeout: 2000
});

// ❌ MAUVAIS - Pas de timeout (30s par défaut, peut traîner)
await page.locator('[data-testid="button"]').click();
```

---

## 📦 Gestion des données

### 1. Utiliser des fixtures

```typescript
// ✅ BON - Données centralisées
// fixtures/test-data.ts
export const testData = {
  validUser: { email: 'test@example.com', password: 'pass123' },
  invalidUser: { email: 'invalid@example.com', password: 'wrong' },
};

// Dans les tests
import { testData } from '../fixtures/test-data';
await loginPage.login(testData.validUser.email, testData.validUser.password);

// ❌ MAUVAIS - Données en dur
await loginPage.login('test@example.com', 'pass123');
```

### 2. Données d'environnement

```typescript
// ✅ BON - Variables d'environnement
const baseUrl = process.env.BASE_URL || 'https://staging.example.com';

// ✅ BON - Via env helper
import env from '../utils/env';
const baseUrl = env.baseUrl;

// ❌ MAUVAIS - Hardcodé
const baseUrl = 'https://production.example.com';
```

### 3. Générateurs de données

```typescript
// ✅ BON - Générer des données dynamiques
function generateUser() {
  const timestamp = Date.now();
  return {
    email: `test_${timestamp}@example.com`,
    username: `user_${timestamp}`,
  };
}

const newUser = generateUser();

// ❌ MAUVAIS - Mêmes données à chaque fois
const user = { email: 'test@example.com' };  // Peut causer des doublons
```

---

## 🔍 Logs et Debugging

### 1. Logs structurés

```typescript
// ✅ BON - Logs avec contexte
import { logger } from '../utils/logger';

test('should login successfully', async () => {
  logger.testStart('Login Test');
  
  logger.stepStart('Navigate to login page');
  await loginPage.navigateTo();
  logger.stepEnd('Navigate to login page');

  logger.stepStart('Enter credentials');
  await loginPage.fill(loginPage.emailInput, 'user@example.com');
  logger.stepEnd('Enter credentials');

  logger.testEnd('Login Test', 'PASSED');
});
```

### 2. Screenshots et vidéos

```typescript
// ✅ BON - Automatique on failure
// playwright.config.ts
use: {
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
}

// ✅ BON - Manuel si nécessaire
await page.screenshot({ path: 'debug-screenshot.png' });

// ❌ MAUVAIS - Pas de capture
// Difficile à debugger en cas d'échec
```

### 3. Mode Debug

```bash
# ✅ BON - Mode debug interactif
npx playwright test --debug

# ✅ BON - Avec pause
test('should do something', async ({ page }) => {
  await page.pause();  // Arrête ici, inspecteur ouvert
});

# ❌ MAUVAIS - Pas de visibilité
npx playwright test  # Erreur obscure
```

---

## 🔧 Maintenabilité

### 1. Tests indépendants

```typescript
// ✅ BON - Chaque test est autonome
test('should login', async ({ page }) => {
  await page.goto('/login');
  await loginPage.login('user@example.com', 'pass123');
  expect(page.url()).toContain('dashboard');
});

test('should logout', async ({ page }) => {
  await page.goto('/');
  // Pas de dépendance à l'état du test précédent
});

// ❌ MAUVAIS - Dépendance entre tests
test.describe('User Journey', () => {
  let userId;
  
  test('create user', () => {
    userId = 123;  // État partagé
  });

  test('use user', () => {
    // Dépend du test précédent ❌
    expect(userId).toBe(123);
  });
});
```

### 2. DRY (Don't Repeat Yourself)

```typescript
// ✅ BON - Méthodes réutilisables
class LoginPage extends BasePage {
  async loginAsUser(role: 'admin' | 'user'): Promise<void> {
    const credentials = role === 'admin' 
      ? testData.adminUser 
      : testData.normalUser;
    await this.login(credentials.email, credentials.password);
  }
}

// ❌ MAUVAIS - Code dupliqué
test('login as admin', async () => {
  await loginPage.fill(emailInput, 'admin@example.com');
  await loginPage.fill(passwordInput, 'admin123');
});

test('login as user', async () => {
  await loginPage.fill(emailInput, 'user@example.com');
  await loginPage.fill(passwordInput, 'user123');
});
```

### 3. Nommage clair

```typescript
// ✅ BON - Noms explicites
test('should display error when submitting empty email field', async () => {
  // Clair ce qu'on teste
});

// ❌ MAUVAIS - Noms vagues
test('test email', async () => {
  // C'est quoi, le test ?
});
```

---

## ⚡ Performance

### 1. Parallélisation

```typescript
// ✅ BON - Exécution parallèle
npx playwright test --workers=4

// Configuration
// playwright.config.ts
export default {
  workers: process.env.CI ? 1 : 4,  // 1 en CI pour stabilité
};
```

### 2. Éviter les sleeps

```typescript
// ✅ BON - Attend l'élément
await page.waitForSelector('[data-testid="confirmation"]', { 
  timeout: 5000 
});

// ❌ MAUVAIS - Sleep inutile
await page.waitForTimeout(5000);  // 5 secondes perdues!
```

### 3. Tests rapides

```typescript
// ✅ BON - Tests smoke rapides
test.describe('@smoke Quick checks', () => {
  test('should load homepage', async ({ page }) => {
    // < 5 secondes
    await page.goto('/');
    expect(page.url()).toContain('example.com');
  });
});

// Pour tests complets
test.describe('@e2e Full workflows', () => {
  test('complete user journey', async ({ page }) => {
    // peut prendre 30-60 secondes
  });
});
```

---

## 🔒 Sécurité

### 1. Protéger les secrets

```typescript
// ✅ BON - Via variables d'environnement
const password = process.env.TEST_USER_PASSWORD;

// ✅ BON - Via env.ts
import env from '../utils/env';
const password = env.testUserPassword;

// ❌ MAUVAIS - En dur dans le code
const password = 'SuperSecretPass123!';  // DANGER!
```

### 2. Ne pas logger les secrets

```typescript
// ✅ BON - Mask sensibles
logger.info(`Login with user: ${email}`);  // OK
logger.info(`Password submitted`);  // OK - pas le mot de passe

// ❌ MAUVAIS
logger.info(`Login: ${email}:${password}`);  // DANGER!
```

### 3. Gestion des tokens

```typescript
// ✅ BON - Utiliser AuthHelper
const token = await AuthHelper.loginViaAPI(page, email, password);

// ✅ BON - Stocker de façon sécurisée
await page.context().addCookies([{
  name: 'auth_token',
  value: token,
  domain: 'example.com',
  path: '/',
}]);

// ❌ MAUVAIS - Token en localStorage en plaintext
localStorage.setItem('token', token);  // Peut être exposé
```

---

## 📊 Checklist avant commit

Avant de pusher vos tests, vérifiez :

### Code
- [ ] ✅ Pas de code hardcodé ou secrets
- [ ] ✅ Noms de tests explicites
- [ ] ✅ Fonctions réutilisables (DRY)
- [ ] ✅ Sélecteurs robustes (data-testid)
- [ ] ✅ Logs présents et utiles
- [ ] ✅ Pas de `setTimeout` ou `.sleep()`

### Exécution
- [ ] ✅ Tests passent localement
- [ ] ✅ Tests indépendants (order numéro)
- [ ] ✅ Les tests fonctionnent en parallèle
- [ ] ✅ Pas de flakiness (run 3x)
- [ ] ✅ Screenshots/vidéos générés en cas d'erreur

### Documentation
- [ ] ✅ Tests documentés (commentaires)
- [ ] ✅ Page Object documenté
- [ ] ✅ Données de test documentées
- [ ] ✅ Variables d'env expliquées

---

## 🚀 Anti-patterns à éviter

| ❌ Anti-pattern | ✅ Bonne pratique |
|---|---|
| `await page.waitForTimeout(5000)` | `await page.waitForSelector(...)` |
| `const btn = button:nth-child(3)` | `const btn = '[data-testid="button"]'` |
| `test('test1') → test('test2')` (dépendances) | Chaque test autonome |
| Données en dur | Fixtures + env variables |
| Assertion vague `expect(page)` | Assertion spécifique `expect(text)` |
| Global state entre tests | Beforeach/Aftereach nettoyage |
| Pas de logs | Logs structurés |
| Ignore les screenshots | Analyse les captures d'erreur |

---

## 📚 Ressources additionnelles

- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Test Automation Guide](https://testautomationu.applitools.com/)
- [Page Object Model Pattern](https://martinfowler.com/bliki/PageObject.html)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Écrivez des tests excellents ! ✨**
