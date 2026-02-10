# 🗂️ Structure complète du projet

Arborescence détaillée du framework Playwright.

```
F2B-Playwright/                          # 📦 Racine du projet
│
├── 📄 DOCUMENTATION & GUIDES           # 📚 Guides complets
│   ├── README.md                       # Documentation principale (30 min)
│   ├── QUICKSTART.md                   # Démarrage rapide (5 min)
│   ├── TESTING_GUIDE.md                # Guide création tests (15 min)
│   ├── BEST_PRACTICES.md               # Bonnes pratiques QA (40 min)
│   ├── TROUBLESHOOTING.md              # FAQ & dépannage (20 min)
│   ├── TEST_COVERAGE.md                # Matrice de couverture
│   ├── GITHUB_SETUP.md                 # Configuration GitHub Actions
│   ├── ALL_DOCS.md                     # Index de documentation
│   ├── PROJECT_SUMMARY.md              # Résumé du projet
│   ├── CHANGELOG.md                    # Historique des versions
│   └── LICENSE                         # Licence MIT
│
├── ⚙️ CONFIGURATION FILES              # ⚙️ Configurations
│   ├── playwright.config.ts            # Playwright config
│   │   └── 5 projets navigateurs
│   │   └── Multi-reporters
│   │   └── Retries & timeouts
│   │
│   ├── tsconfig.json                   # TypeScript config
│   │   └── ES2022 target
│   │   └── Strict mode
│   │   └── Path aliases
│   │
│   ├── package.json                    # npm dependencies
│   │   └── 20+ packages
│   │   └── 12 npm scripts
│   │   └── DevDependencies
│   │
│   ├── .env                            # Variables LOCALES (gitignored)
│   ├── .env.example                    # Template .env
│   ├── .eslintrc.json                  # ESLint rules
│   ├── .prettierrc.json                # Code formatting
│   └── .gitignore                      # Git patterns
│
├── 📁 pages/                           # 🎭 PAGE OBJECTS (POM)
│   ├── BasePage.ts                     # Classe de base (15 méthodes)
│   │   ├── click()
│   │   ├── fill()
│   │   ├── getText()
│   │   ├── isVisible()
│   │   ├── waitForElement()
│   │   ├── goto()
│   │   ├── goBack()
│   │   ├── goForward()
│   │   ├── reload()
│   │   ├── screenshot()
│   │   ├── takeScreenshot()
│   │   └── ... (plus 3 autres)
│   │
│   ├── HomePage.ts                     # Page d'accueil
│   │   ├── navigateTo()
│   │   ├── clickLoginButton()
│   │   ├── clickSignupButton()
│   │   ├── isHomepageDisplayed()
│   │   ├── isLogoVisible()
│   │   ├── isFeaturesVisible()
│   │   └── ... (plus 3 autres)
│   │
│   ├── LoginPage.ts                    # Page de connexion
│   │   ├── navigateToLogin()
│   │   ├── fillLoginForm()
│   │   ├── login()
│   │   ├── clickLoginButton()
│   │   ├── clickForgotPasswordLink()
│   │   ├── checkRememberMe()
│   │   ├── getErrorMessage()
│   │   ├── getSuccessMessage()
│   │   ├── isLoginPageDisplayed()
│   │   └── ... (plus 2 autres)
│   │
│   └── DashboardPage.ts                # Tableau de bord
│       ├── navigateToDashboard()
│       ├── isDashboardLoaded()
│       ├── getWelcomeMessage()
│       ├── clickUserMenu()
│       ├── clickLogoutButton()
│       ├── goToSettings()
│       ├── logout()
│       └── ... (plus 5 autres)
│
├── 📁 tests/                           # 🧪 TESTS
│   ├── 🔥 smoke/                       # Tests rapides (< 5 min)
│   │   └── homepage.spec.ts            # 4 smoke tests
│   │       ├── Chargement page
│   │       ├── Éléments visibles
│   │       ├── Boutons accessibles
│   │       └── Titre valide
│   │
│   ├── 🎯 e2e/                         # Tests complets utilisateur
│   │   └── auth.spec.ts                # 4 E2E tests
│   │       ├── Login valide
│   │       ├── Erreur credentials
│   │       ├── Logout flow
│   │       └── Validation form
│   │
│   ├── 🔌 api/                         # Tests API
│   │   └── api.spec.ts                 # 5 API tests
│   │       ├── GET /user
│   │       ├── POST /posts
│   │       ├── GET /posts
│   │       ├── Validation données
│   │       └── Erreurs authentification
│   │
│   ├── 🔄 regression/                  # Tests approfondis
│   │   └── ui-regression.spec.ts       # 5 regression tests
│   │       ├── Flux complet accueil
│   │       ├── Navigation dashboard
│   │       ├── Navigation arrière/avant
│   │       ├── Cohérence UI
│   │       └── Stabilité login
│   │
│   └── helpers/                        # 🛠️ Utilitaires tests
│       ├── AuthHelper.ts               # Aide authentification
│       │   ├── loginViaAPI()
│       │   ├── setAuthToken()
│       │   ├── getAuthToken()
│       │   ├── clearAuthToken()
│       │   └── isUserLoggedIn()
│       │
│       └── WaitHelper.ts               # Aide attentes
│           ├── waitForUrl()
│           ├── waitForCondition()
│           ├── waitForElements()
│           └── waitForElementToDisappear()
│
├── 📁 utils/                           # 🔧 UTILITAIRES
│   ├── env.ts                          # Configuration centralisée
│   │   ├── nodeEnv
│   │   ├── environment
│   │   ├── baseUrl
│   │   ├── apiBaseUrl
│   │   ├── testUserEmail
│   │   ├── testUserPassword
│   │   ├── testAdminEmail
│   │   ├── testAdminPassword
│   │   ├── browser
│   │   ├── headless
│   │   ├── slowMo
│   │   ├── timeout
│   │   └── ... (plus 2 autres)
│   │
│   ├── logger.ts                       # Logger personnalisé
│   │   ├── debug()
│   │   ├── info()
│   │   ├── warn()
│   │   ├── error()
│   │   ├── testStart()
│   │   ├── testEnd()
│   │   ├── stepStart()
│   │   ├── stepEnd()
│   │   └── setLevel()
│   │
│   └── apiClient.ts                    # Client HTTP
│       ├── get()
│       ├── post()
│       ├── put()
│       ├── delete()
│       ├── patch()
│       ├── setAuthToken()
│       ├── clearAuthToken()
│       └── getClient()
│
├── 📁 fixtures/                        # 📊 DONNÉES DE TEST
│   ├── test-data.ts                    # Format TypeScript
│   │   ├── testData
│   │   │   ├── validUser
│   │   │   ├── adminUser
│   │   │   ├── invalidCredentials
│   │   │   └── ...
│   │   ├── apiTestData
│   │   └── endpoints
│   │
│   └── test-data.json                  # Format JSON
│       ├── validUser
│       ├── adminUser
│       └── testUsers
│
├── 📁 .github/                         # 🚀 CI/CD
│   └── workflows/
│       └── playwright.yml              # GitHub Actions workflow
│           ├── Tests parallèles
│           ├── Sharding (3x)
│           ├── Multi-navigateurs
│           ├── Upload d'artifacts
│           ├── Rapport Allure
│           ├── GitHub Pages
│           └── Notifications
│
├── 📁 reports/                         # 📈 RAPPORTS GÉNÉRÉS
│   ├── playwright-report/              # Rapport HTML
│   │   ├── index.html
│   │   ├── test-results.json
│   │   └── ...
│   │
│   └── allure-results/                 # Résultats Allure
│       ├── *.json
│       └── history/
│
├── 📁 test-results/                    # 📋 RÉSULTATS DE TEST
│   ├── screenshots/                    # Captures d'écran
│   │   └── [test-name].png
│   │
│   ├── videos/                         # Vidéos
│   │   └── [test-name].webm
│   │
│   └── results.json                    # Résultats JSON
│
├── 📁 node_modules/                    # (gitignored)
│   └── [20+ packages]
│
├── 🔧 Setup Scripts
│   ├── setup.sh                        # Installation Linux/macOS
│   └── setup.bat                       # Installation Windows
│
└── 📝 Root Files
    ├── .gitignore                      # Fichiers ignorés
    ├── .eslintrc.json                  # Linting
    ├── .prettierrc.json                # Formatting
    └── package-lock.json               # Lock file npm
```

---

## 📊 Statistiques de structure

### Dossiers
- **Configuration** : 1 (`none`)
- **Page Objects** : 1 (pages/)
- **Tests** : 1 (tests/) avec 4 sous-dossiers
- **Utilitaires** : 1 (utils/)
- **Données** : 1 (fixtures/)
- **CI/CD** : 1 (.github/)
- **Rapports** : 2 (reports/, test-results/)
- **Documentation** : 10 fichiers Markdown

### Fichiers par catégorie

| Catégorie | Nombre | Type |
|-----------|--------|------|
| Page Objects | 4 | `.ts` |
| Tests | 4 | `.spec.ts` |
| Helpers | 2 | `.ts` |
| Utils | 3 | `.ts` |
| Config | 7 | Divers |
| Documentation | 10 | `.md` |
| Scripts | 2 | `.sh`, `.bat` |
| **Total** | **32** | |

---

## 🎯 Chemins d'import principaux

```typescript
// Page Objects
import { HomePage } from '@pages/HomePage';
import { LoginPage } from '@pages/LoginPage';
import { DashboardPage } from '@pages/DashboardPage';

// Tests
import { test, expect } from '@playwright/test';

// Utils
import env from '@utils/env';
import { logger } from '@utils/logger';
import { apiClient } from '@utils/apiClient';

// Helpers
import { AuthHelper } from '@tests/helpers/AuthHelper';
import { WaitHelper } from '@tests/helpers/WaitHelper';

// Fixtures
import { testData } from '@fixtures/test-data';
```

---

## 📦 Stockage des données

### Local (gitignored)
- `.env` - Secrets locaux
- `test-results/` - Résultats exécution
- `playwright-report/` - Rapports HTML
- `allure-results/` - Résultats Allure

### Versionné (committed)
- `fixtures/test-data.ts` - Données publiques
- `fixtures/test-data.json` - Données JSON
- All source code (pages/, tests/, utils/)
- Configuration files

### Généré (CI/CD)
- `allure-report/` - Rapport final Allure
- GitHub Pages deployment

---

## 🔄 Flux de données

```
.env (variables)
    ↓
utils/env.ts (configuration centralisée)
    ↓
Pages / Utils / Tests
    ↓
fixtures/test-data.ts (données partagées)
    ↓
Tests execution
    ↓
test-results/ (artifacts)
    ↓
playwright-report/ + allure-results/
    ↓
GitHub Pages (CI/CD)
```

---

## 🚀 Arborescence après exécution

```
F2B-Playwright/
├── test-results/
│   ├── results.json
│   ├── results.xml
│   ├── screenshots/
│   │   └── homepage-failed-1.png
│   └── videos/
│       └── auth-spec-1.webm
│
├── playwright-report/
│   ├── index.html
│   ├── data/
│   └── ...
│
└── allure-results/
    ├── *.json
    └── ...
```

---

## 📂 Tailles approximatives

| Dossier | Taille |
|---------|--------|
| pages/ | ~8 KB |
| tests/ | ~15 KB |
| utils/ | ~10 KB |
| fixtures/ | ~2 KB |
| docs | ~150 KB |
| .github/ | ~5 KB |
| node_modules/ | ~500 MB |
| **Total (sans node_modules)** | **~190 KB** |

---

## 🎯 Accès rapide

**Ajouter un Page Object**
```bash
vim pages/NewPage.ts
```

**Ajouter un test**
```bash
vim tests/[smoke|e2e|api|regression]/new-test.spec.ts
```

**Ajouter un helper**
```bash
vim tests/helpers/NewHelper.ts
```

**Modifier la config**
```bash
vim playwright.config.ts
```

**Consulter les logs/rapports** (après exécution)
```bash
npm run test:reporter          # HTML report
npm run report:allure          # Allure report
cat test-results/results.json  # JSON results
```

---

## 🔐 Fichiers sensibles (gitignored)

- `.env` - Secrets locaux
- `node_modules/` - Dépendances
- `test-results/` - Données locales
- `playwright-report/` - Rapports locaux
- `allure-results/` - Résultats locaux
- `.DS_Store` - macOS files

---

**Structure prête pour production ! ✨**
