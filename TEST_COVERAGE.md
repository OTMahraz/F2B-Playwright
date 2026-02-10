# 📊 Matrice de couverture des tests

Ce document indique quels tests couvrent quels domaines.

## Vue d'ensemble

| Feature | Smoke | E2E | API | Regression | Couverture |
|---------|-------|-----|-----|------------|-----------|
| **Authentification** | ✅ | ✅ | ✅ | ✅ | 100% |
| **Navigation** | ✅ | ✅ | ❌ | ✅ | 75% |
| **UI Rendering** | ✅ | ❌ | ❌ | ✅ | 50% |
| **Formulaires** | ✅ | ✅ | ❌ | ✅ | 75% |
| **Erreurs** | ❌ | ✅ | ✅ | ✅ | 75% |
| **Performance** | ❌ | ❌ | ❌ | ✅ | 25% |

## Détail par test type

### 🔥 Smoke Tests (tests/smoke/)
- **Objectif** : Vérification rapide que le système fonctionne
- **Durée** : < 5 minutes
- **Fréquence** : À chaque commit
- **Coverage** : ~30%

**Tests inclus** :
- ✅ [tests/smoke/homepage.spec.ts](tests/smoke/homepage.spec.ts)
  - Chargement de la page d'accueil
  - Éléments visibles
  - Boutons accessibles

### 🎯 E2E Tests (tests/e2e/)
- **Objectif** : Vérifier les flux complets utilisateur
- **Durée** : 5-15 minutes
- **Fréquence** : À chaque commit
- **Coverage** : ~50%

**Tests inclus** :
- ✅ [tests/e2e/auth.spec.ts](tests/e2e/auth.spec.ts)
  - Login avec identifiants valides
  - Erreurs avec identifiants invalides
  - Logout depuis dashboard
  - Validation du formulaire

### 🔌 API Tests (tests/api/)
- **Objectif** : Tester les endpoints API
- **Durée** : 2-5 minutes
- **Fréquence** : À chaque commit
- **Coverage** : ~40%

**Tests inclus** :
- ✅ [tests/api/api.spec.ts](tests/api/api.spec.ts)
  - GET /api/user
  - POST /api/posts
  - GET /api/posts
  - Validation des données
  - Gestion des erreurs d'authentification

### 🔄 Regression Tests (tests/regression/)
- **Objectif** : Tester en profondeur + stabilité
- **Durée** : 15-30 minutes
- **Fréquence** : Hebdomadaire ou avant release
- **Coverage** : ~70%

**Tests inclus** :
- ✅ [tests/regression/ui-regression.spec.ts](tests/regression/ui-regression.spec.ts)
  - Flux complet accueil → login → dashboard
  - Navigation dans le dashboard
  - Navigation arrière/avant du navigateur
  - Cohérence UI
  - Stabilité du login (multiple attempts)

## Couverture par page

### 📄 HomePage
| Fonction | Smoke | E2E | API | Regression |
|----------|-------|-----|-----|------------|
| Chargement | ✅ | ✅ | ❌ | ✅ |
| Logo visible | ✅ | ❌ | ❌ | ✅ |
| Bouton Login | ✅ | ✅ | ❌ | ✅ |
| Bouton Signup | ✅ | ❌ | ❌ | ❌ |
| Features visible | ✅ | ❌ | ❌ | ✅ |

### 🔐 LoginPage
| Fonction | Smoke | E2E | API | Regression |
|----------|-------|-----|-----|------------|
| Affichage | ✅ | ✅ | ❌ | ✅ |
| Login valide | ❌ | ✅ | ✅ | ✅ |
| Login invalide | ❌ | ✅ | ❌ | ✅ |
| Validation form | ❌ | ✅ | ❌ | ✅ |
| Forgot password | ❌ | ❌ | ❌ | ❌ |
| Remember me | ❌ | ❌ | ❌ | ❌ |

### 📊 DashboardPage
| Fonction | Smoke | E2E | API | Regression |
|----------|-------|-----|-----|------------|
| Chargement | ❌ | ✅ | ❌ | ✅ |
| Message bienvenue | ❌ | ✅ | ❌ | ✅ |
| Infos utilisateur | ❌ | ❌ | ❌ | ❌ |
| Logout | ❌ | ✅ | ❌ | ❌ |
| Menu nav | ❌ | ❌ | ❌ | ✅ |
| Stats panel | ❌ | ❌ | ❌ | ✅ |

## Plan d'augmentation de couverture

### Phase 1️⃣ (Immédiat)
- [ ] Ajouter tests pour "Forgot Password"
- [ ] Ajouter tests pour "Sign Up"
- [ ] Ajouter tests erreurs API 5XX

### Phase 2️⃣ (Court terme)
- [ ] Tests de performance (Core Web Vitals)
- [ ] Tests d'accessibilité (a11y)
- [ ] Tests responsivité mobile
- [ ] Tests E2E complets shopping flow

### Phase 3️⃣ (Long terme)
- [ ] Tests visuels (screenshot diffs)
- [ ] Tests de sécurité (XSS, CSRF)
- [ ] Tests de compatibilité navigateurs
- [ ] Tests de charge

## Comment augmenter la couverture

1. **Ajouter un test manquant** :
```typescript
// Dans le fichier approprié
test('should [décrire l\'action]', async () => {
  // Implémenter le test
});
```

2. **Mettre à jour cette matrice** :
   - Ajouter une ligne ✅ au tableau pertinent
   - Augmenter les pourcentages de couverture

3. **Documenter dans la PR** :
   - Qu'est-ce qui est testé
   - Quelles lignes de code sont couvertes

## Métriques

```bash
# Voir les stats
npx playwright test --reporter=json | jq '.stats'

# Exemple de sortie:
# {
#   "expected": 24,    # Tests qu'il faut que passent
#   "unexpected": 0,   # Tests que devraient échouer mais passent
#   "flaky": 1,        # Tests instables
#   "skipped": 2,      # Tests ignorés
#   "duration": 45000  # Durée totale en ms
# }
```

---

**Objectif** : Atteindre 80%+ de couverture dans 6 mois
