# 🔧 Troubleshooting & FAQ

## Questions Fréquentes

### 1. Comment installer le projet ?

```bash
# Clone ou navigue vers le repo
cd F2B-Playwright

# Installe les dépendances
npm install

# Installe les navigateurs Playwright
npx playwright install

# Configure les variables d'environnement
cp .env.example .env
# Édite .env avec tes paramètres
```

### 2. Les tests ne trouvent pas les éléments

#### Problème
```
Error: locator.click: No locator matches the specified selector
```

#### Solutions
1. **Vérifier le sélecteur** :
```bash
npx playwright codegen https://example.com
```

2. **Utiliser `data-testid`** au lieu de sélecteurs fragiles :
```typescript
// ✅ BON
const button = '[data-testid="login-button"]';

// ❌ MAUVAIS
const button = 'button:nth-child(3)';
```

3. **Attendre l'élément** :
```typescript
await page.waitForSelector('[data-testid="element"]');
await page.locator('[data-testid="element"]').click();
```

### 3. Les tests timeout

#### Problème
```
Error: Timeout waiting for element (30000 ms)
```

#### Solutions

**Augmenter le timeout** :
```typescript
await page.waitForSelector(selector, { timeout: 60000 });
```

**Ou réduire pour les éléments rapides** :
```typescript
await page.locator(selector).waitFor({ timeout: 3000 });
```

**Utiliser WaitHelper** :
```typescript
await WaitHelper.waitForUrl(page, '/dashboard');
```

### 4. Impossible de se connecter aux tests

#### Problème
```
Login Failed: 401 Unauthorized
```

#### Solutions
1. **Vérifier les credentials dans .env** :
```bash
TEST_USER_EMAIL=correct@example.com
TEST_USER_PASSWORD=correct_password
```

2. **Vérifier que le serveur backend tourne** :
```bash
# Vérifier la base URL
echo $BASE_URL
```

3. **Utiliser AuthHelper pour connexion API (plus rapide)** :
```typescript
const token = await AuthHelper.loginViaAPI(
  page,
  'user@example.com',
  'password',
  env.apiBaseUrl
);
```

### 5. Les screenshots et vidéos ne sont pas générés

#### Vérifier la configuration
```typescript
// playwright.config.ts
use: {
  screenshot: 'only-on-failure',  // ou 'always'
  video: 'retain-on-failure',     // ou 'always'
}
```

#### Générer manuellement
```typescript
await page.screenshot({ path: 'screenshot.png' });
await page.video()?.saveAs('video.webm');
```

### 6. Allure Reporter ne génère pas le rapport

#### Solution 1 : Installer Allure CLI
```bash
# macOS
brew install allure

# Windows (avec Chocolatey)
choco install allure

# Ou en global NPM
npm install -g allure-commandline
```

#### Solution 2 : Générer via npm
```bash
npm run report:allure
```

#### Solution 3 : Vérifier les résultats
```bash
ls allure-results/
```

### 7. Les tests passent localement mais échouent en CI/CD

#### Vérifier les logs
```bash
# Voir les logs du workflow GitHub
# Actions tab → Workflow run → test job
```

#### Causes courantes
- **Timeouts différents** : Augmenter dans CI
```bash
CI=true npm test -- --timeout=60000
```

- **Pas d'affichage du navigateur** : Normal en CI
```bash
HEADLESS=true npm test
```

- **Variables d'environnement manquantes** : Configurer les secrets GitHub
- **Navigateurs non installés** : Ajout bien présent dans le workflow

### 8. Comment exécuter un seul test ?

```bash
# Test spécifique
npx playwright test -g "should login successfully"

# Fichier spécifique
npx playwright test tests/e2e/auth.spec.ts

# Suite spécifique
npx playwright test -g "@e2e"

# En mode headed
npx playwright test tests/e2e/auth.spec.ts --headed
```

### 9. Mode Debug

```bash
# Démarrer le debugger
npx playwright test --debug

# Avec l'inspecteur UI
npx playwright test tests/e2e/auth.spec.ts --debug --headed
```

### 10. Nettoyer les anciens résultats

```bash
# Script npm
npm run clean

# Ou manuellement
rm -rf test-results playwright-report allure-results allure-report
```

---

## Erreurs Communes

### Error: `connect ECONNREFUSED`

```
Error: connect ECONNREFUSED 127.0.0.1:3000
```

**Cause** : Le serveur backend n'est pas en cours d'exécution

**Fixe** :
```bash
# Démarrer le serveur dans un autre terminal
npm run dev

# Puis les tests dans un autre
npm test
```

### Error: `Failed to launch browser`

```
Error: Failed to launch browser, launch failed: ...
```

**Cause** : Les navigateurs ne sont pas installés

**Fixe** :
```bash
npx playwright install --with-deps
```

### Error: `Test timeout`

```
Error: Timeout 30000ms exceeded
```

**Cause** : Le test prend trop longtemps

**Fixe** :
```typescript
test.setTimeout(60000); // 60 secondes

// Ou augmenter dans la config
test.slow();  // Multiplier le timeout par 3
```

### Error: `UnhandledPromiseRejectionWarning`

**Cause** : Erreur non gérée dans le test

**Fixe** :
```typescript
try {
  // Code qui peut échouer
} catch (error) {
  logger.error('Erreur attendue', error);
}
```

---

## Performance

### Accélérer les tests

1. **Utiliser le sharding** (paralléliser) :
```bash
npx playwright test --shard=1/3
```

2. **Réduire les timeouts** :
```typescript
test.setTimeout(15000);
```

3. **Éviter les sleeps inutiles** :
```typescript
// ❌ LENT
await page.waitForTimeout(5000);

// ✅ RAPIDE
await page.waitForSelector('[data-testid="loaded"]');
```

4. **Utiliser les fixtures** (cache) :
```typescript
test.describe.configure({ mode: 'serial' });
```

5. **Désactiver les vidéos en normal** :
```typescript
video: 'retain-on-failure'  // Seulement en cas d'échec
```

### Vérifier la performance

```bash
npx playwright test --reporter=html --reporter=json
# Voir les durées dans le rapport HTML
```

---

## Ressources

- 📖 [Playwright Official Docs](https://playwright.dev)
- 🐛 [Debugging Guide](https://playwright.dev/docs/debug)
- 📚 [API Reference](https://playwright.dev/docs/api/class-page)
- 🔧 [Troubleshooting Guide](https://playwright.dev/docs/troubleshooting)
- 💡 [Best Practices](https://playwright.dev/docs/best-practices)

---

## Besoin d'aide ?

1. **Consulter les logs** :
   ```bash
   npm test -- --reporter=verbose
   ```

2. **Utiliser le code generator** :
   ```bash
   npx playwright codegen https://example.com
   ```

3. **Vérifier la configuration** :
   ```typescript
   // playwright.config.ts
   console.log(config);
   ```

4. **Créer une issue GitHub** avec:
   - Logs complets
   - Code du test
   - Environment (OS, Node version)
   - Fichier .env (sans secrets évidemment!)

---

**Bon courage ! 🚀**
