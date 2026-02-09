# ⚡ Quick Start (5 minutes)

Guide rapide pour commencer avec Playwright en 5 minutes.

## 1️⃣ Installation (2 min)

### Windows
```bash
# Double-cliquez sur setup.bat
setup.bat
```

### macOS/Linux
```bash
# Exécutez le script de setup
bash setup.sh
```

### Manuel
```bash
# Installation des dépendances
npm install

# Installation des navigateurs
npx playwright install

# Configurer .env
cp .env.example .env
```

## 2️⃣ Premier test (2 min)

```bash
# Exécuter tous les tests
npm test

# Ou seulement les smoke tests (rapides)
npm run test:smoke

# Voir les résultats en UI
npm run test:ui

# Voir le rapport HTML généré
npm run test:reporter
```

## 3️⃣ Créer votre premier test (1 min)

Créez le fichier `tests/smoke/my-first-test.spec.ts` :

```typescript
import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';

test('@smoke should load homepage', async ({ page }) => {
  const homePage = new HomePage(page);
  
  // Naviger vers la page
  await homePage.navigateTo();
  
  // Vérifier que c'est chargé
  const isLoaded = await homePage.isHomepageDisplayed();
  expect(isLoaded).toBe(true);
});
```

Ensuite :
```bash
npm run test:smoke
```

## 📋 Commandes essentielles

```bash
# Tous les tests
npm test

# Interface utilisateur (recommandé pour déboguer)
npm run test:ui

# Tests spécifiques par tag
npm run test:smoke         # Rapides
npm run test:e2e           # Bout en bout
npm run test:api           # API
npm run test:regression    # Approfondis

# Mode headed (voir le navigateur)
npm run test:headed

# Mode debug (inspecter le code)
npm run test:debug

# Voir les rapports
npm run test:reporter      # HTML
npm run report:allure      # Allure
```

## 🎯 Workflow typique

1. **Écrire un test**
   ```bash
   # Créer le fichier
   touch tests/e2e/my-feature.spec.ts
   ```

2. **Générer les sélecteurs** (optionnel)
   ```bash
   npx playwright codegen https://example.com
   ```

3. **Exécuter le test**
   ```bash
   npm run test:e2e
   ```

4. **Déboguer si besoin**
   ```bash
   npm run test:debug
   ```

5. **Vérifier les rapports**
   ```bash
   npm run test:reporter
   ```

## 📁 Structure de base

```
mon-test/
├── mon-nouveau-test.spec.ts    # Mon test
├── pages/                       # Pas besoin de créer, déjà là
└── utils/                       # Utilitaires
```

## 💡 Pro Tips

### 1. Utiliser le mode UI (recommandé)
```bash
npm run test:ui
```
C'est BEAUCOUP plus facile que de lancer 100 fois ! 🎉

### 2. Tester un seul fichier
```bash
npx playwright test tests/smoke/homepage.spec.ts
```

### 3. Tester avec un pattern
```bash
npx playwright test -g "should login"
```

### 4. Pause dans le test pour inspecter
```typescript
await page.pause();  // Arrête la et inspecte avec l'outil de développement
```

### 5. Générer un sélecteur
```bash
npx playwright codegen https://example.com  # Lance le code generator
```

## ⚙️ Configuration de base

### 1. Modifier l'URL de base
Éditez `.env` :
```env
BASE_URL=https://votre-app.com
```

### 2. Modifier un credential de test
Éditez `.env` :
```env
TEST_USER_EMAIL=votre@email.com
TEST_USER_PASSWORD=votre_mot_de_passe
```

### 3. Changer le navigateur
```bash
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## 🐛 Déboguer rapidement

### Problème : Test ne trouve pas un élément
```bash
# Utiliser le code generator
npx playwright codegen https://example.com

# Ou mode debug
npm run test:debug
```

### Problème : Test timeout
```typescript
// Augmenter le timeout
test.setTimeout(60000);
```

### Problème : Voir ce qui se passe
```bash
# Mode headed (affiche le navigateur)
npm run test:headed
```

## 📚 Documentations rapides

- **Ajouter un test** : Voir [TESTING_GUIDE.md](TESTING_GUIDE.md)
- **Bonnes pratiques** : Voir [BEST_PRACTICES.md](BEST_PRACTICES.md)
- **FAQ** : Voir [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- **Documentation complète** : Voir [README.md](README.md)

## ✅ Checklist - Prêt à commencer?

- [ ] ✅ `npm install` exécuté
- [ ] ✅ `.env` configuré avec BASE_URL
- [ ] ✅ Au moins un test lancé avec `npm run test:smoke`
- [ ] ✅ Rapport HTML affiché avec `npm run test:reporter`
- [ ] ✅ Prêt à créer vos propres tests ! 🚀

---

**Besoin d'aide ?** → Consultez [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

**Prêt pour les détails ?** → Allez à [README.md](README.md)

**Bon test ! 🎭**
