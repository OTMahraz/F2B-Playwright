# 📚 Guide de Création de Nouveaux Tests

Ce guide vous accompagne à travers le processus de création de nouveaux tests pour le framework Playwright.

## Table des matières

1. [Créer un Page Object](#créer-un-page-object)
2. [Créer un Test](#créer-un-test)
3. [Exemples pratiques](#exemples-pratiques)
4. [Checklist](#checklist)

---

## Créer un Page Object

### Étape 1 : Créer le fichier

Créez un nouveau fichier dans `pages/` avec le nom de la page :

```typescript
// pages/ProductPage.ts
import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { logger } from '../utils/logger';

export class ProductPage extends BasePage {
  // Définir les sélecteurs
  readonly productTitle = '[data-testid="product-title"]';
  readonly addToCartButton = '[data-testid="add-to-cart"]';
  readonly priceDisplay = '[data-testid="price"]';
  readonly reviewSection = '[data-testid="reviews"]';

  constructor(page: Page) {
    super(page);
  }

  // Implémenter les actions
  async navigateToProduct(productId: string): Promise<void> {
    await this.goto(`/products/${productId}`);
    await this.waitForPageLoad();
    logger.info(`Produit ${productId} chargé`);
  }

  async addToCart(): Promise<void> {
    await this.click(this.addToCartButton);
    logger.info('Produit ajouté au panier');
  }

  // Implémenter les vérifications
  async isProductDisplayed(): Promise<boolean> {
    return this.isVisible(this.productTitle);
  }

  async getProductPrice(): Promise<string> {
    return this.getText(this.priceDisplay);
  }

  async isReviewSectionVisible(): Promise<boolean> {
    return this.isVisible(this.reviewSection);
  }
}
```

### Étape 2 : Respecter les conventions

- ✅ Étenez toujours `BasePage`
- ✅ Déclarez les sélecteurs comme propriétés `readonly`
- ✅ Préfixez les méthodes d'action avec des verbes (click, fill, etc.)
- ✅ Préfixez les méthodes de vérification avec is/has/get (isVisible, getPrice)
- ✅ Ajoutez des logs pour tracer l'exécution

---

## Créer un Test

### Étape 1 : Créer le fichier test

Placez votre test dans le dossier approprié :

```typescript
// tests/e2e/product.spec.ts
import { test, expect } from '@playwright/test';
import { ProductPage } from '../../pages/ProductPage';
import { logger } from '../../utils/logger';

test.describe('@e2e Product Tests', () => {
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    logger.info('Test de produit initialisé');
  });

  test('should display product details correctly', async () => {
    logger.testStart('Product Details Display');
    
    logger.stepStart('Naviguer vers le produit');
    await productPage.navigateToProduct('12345');
    logger.stepEnd('Naviguer vers le produit');

    logger.stepStart('Vérifier l\'affichage');
    const isDisplayed = await productPage.isProductDisplayed();
    expect(isDisplayed).toBe(true);
    logger.stepEnd('Vérifier l\'affichage');

    logger.testEnd('Product Details Display', 'PASSED');
  });

  test('should add product to cart', async () => {
    logger.testStart('Add to Cart');
    
    await productPage.navigateToProduct('12345');
    
    logger.stepStart('Ajouter au panier');
    await productPage.addToCart();
    logger.stepEnd('Ajouter au panier');

    logger.testEnd('Add to Cart', 'PASSED');
  });
});
```

### Étape 2 : Structure standard des tests

```typescript
test.describe('Nom de la suite', () => {
  // Setup
  test.beforeEach(async ({ page }) => {
    // Code d'initialisation
  });

  // Teardown (optionnel)
  test.afterEach(async ({ page }) => {
    // Code de nettoyage
  });

  // Test individuel
  test('description du test', async ({ page, request }) => {
    logger.testStart('Test Name');
    
    // Étapes du test
    logger.stepStart('Étape 1');
    // ...
    logger.stepEnd('Étape 1');

    // Assertion
    expect(actual).toBe(expected);

    logger.testEnd('Test Name', 'PASSED');
  });
});
```

---

## Exemples pratiques

### Exemple 1 : Test de formulaire

```typescript
// pages/RegistrationPage.ts
export class RegistrationPage extends BasePage {
  readonly firstNameInput = 'input[name="firstName"]';
  readonly lastNameInput = 'input[name="lastName"]';
  readonly emailInput = 'input[name="email"]';
  readonly registerButton = 'button[type="submit"]';
  readonly successMessage = '[data-testid="success"]';

  async fillRegistration(data: RegistrationData): Promise<void> {
    await this.fill(this.firstNameInput, data.firstName);
    await this.fill(this.lastNameInput, data.lastName);
    await this.fill(this.emailInput, data.email);
    logger.info('Formulaire rempli');
  }

  async submitForm(): Promise<void> {
    await this.click(this.registerButton);
    await this.waitForElement(this.successMessage);
    logger.info('Formulaire soumis');
  }

  async register(data: RegistrationData): Promise<void> {
    await this.fillRegistration(data);
    await this.submitForm();
  }
}

// tests/e2e/registration.spec.ts
test('should register new user', async ({ page }) => {
  const regPage = new RegistrationPage(page);
  
  await regPage.navigateTo('/register');
  
  await regPage.register({
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean@example.com'
  });
  
  expect(await regPage.isSuccessMessageVisible()).toBe(true);
});
```

### Exemple 2 : Test avec données de fixture

```typescript
// tests/smoke/cart.spec.ts
import { testData } from '../../fixtures/test-data';

test('should display correct item count in cart', async ({ page }) => {
  const cartPage = new CartPage(page);
  
  for (const item of testData.cartItems) {
    await cartPage.addItem(item);
  }
  
  const count = await cartPage.getItemCount();
  expect(count).toBe(testData.cartItems.length);
});
```

### Exemple 3 : Test API avec authentification

```typescript
// tests/api/orders.spec.ts
import { apiClient } from '../../utils/apiClient';
import { AuthHelper } from '../helpers/AuthHelper';

test('should create order via API', async ({ request }) => {
  logger.testStart('API Order Creation');
  
  // Authentification
  const token = await AuthHelper.loginViaAPI(
    request,
    'user@example.com',
    'password',
    env.apiBaseUrl
  );
  
  // Créer une commande
  const response = await request.post(`${env.apiBaseUrl}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      items: [{ id: 1, quantity: 2 }],
      shippingAddress: '123 Main St'
    }
  });
  
  expect(response.status()).toBe(201);
  
  logger.testEnd('API Order Creation', 'PASSED');
});
```

### Exemple 4 : Test avec attente personnalisée

```typescript
// tests/regression/checkout.spec.ts
import { WaitHelper } from '../helpers/WaitHelper';

test('should complete checkout process', async ({ page }) => {
  const checkoutPage = new CheckoutPage(page);
  
  await checkoutPage.fillShippingInfo({
    address: '123 Main St',
    city: 'Paris'
  });
  
  // Attendre la confirmation
  await WaitHelper.waitForUrl(page, '/confirmation');
  
  // Attendre la disparition du loader
  await WaitHelper.waitForElementToDisappear(page, '[data-testid="loader"]');
  
  const isConfirmed = await checkoutPage.isOrderConfirmed();
  expect(isConfirmed).toBe(true);
});
```

---

## Checklist

Avant de committer un nouveau test, vérifiez :

- [ ] ✅ Le fichier de test suit la structure standard
- [ ] ✅ Les sélecteurs utilisent `data-testid` si possible
- [ ] ✅ Les logs sont présents (testStart, testEnd, stepStart, stepEnd)
- [ ] ✅ Les assertions sont explicites et significatives
- [ ] ✅ Le test est indépendant et isolé
- [ ] ✅ Le test a un tag approprié (@smoke, @e2e, @api, @regression)
- [ ] ✅ Les données de test proviennent de `fixtures/`
- [ ] ✅ Les délais importants sont gérés avec `waitFor` ou `WaitHelper`
- [ ] ✅ Le code suit les conventions de nommage
- [ ] ✅ Le test passe en exécution locale

---

**Bon test ! 🚀**
