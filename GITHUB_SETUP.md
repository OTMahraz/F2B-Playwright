# Secrets GitHub à configurer

Pour utiliser le workflow GitHub Actions, configurez ces secrets dans votre repo :

## Étapes de configuration

1. Allez sur votre repository GitHub
2. Settings → Secrets and variables → Actions
3. Créez les secrets suivants avec les commandes `gh secret set` ou via l'interface web

## Secrets requis

### URLs de base (optionnel si BON par défaut)
```
STAGING_BASE_URL=https://staging.example.com
STAGING_API_BASE_URL=https://api.staging.example.com
PRODUCTION_BASE_URL=https://example.com
PRODUCTION_API_BASE_URL=https://api.example.com
```

### Identifiants de test
```
TEST_USER_EMAIL=test.user@example.com
TEST_USER_PASSWORD=your_secure_password_here
TEST_ADMIN_EMAIL=admin@example.com
TEST_ADMIN_PASSWORD=admin_secure_password_here
```

### Slack (optionnel pour les notifications)
```
SLACK_WEBHOOK=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

### GitHub Pages (auto-généré, pas besoin de configurer)
- `GITHUB_TOKEN` est fourni automatiquement par GitHub Actions

## Commande GitHub CLI

Si vous utilisez la CLI GitHub, vous pouvez créer les secrets comme suit :

```bash
gh secret set STAGING_BASE_URL -b "https://staging.example.com"
gh secret set STAGING_API_BASE_URL -b "https://api.staging.example.com"
gh secret set TEST_USER_EMAIL -b "test.user@example.com"
gh secret set TEST_USER_PASSWORD -b "your_password"
gh secret set SLACK_WEBHOOK -b "https://hooks.slack.com/..."
```

## Vérification

Liste les secrets configurés :
```bash
gh secret list
```

## Sécurité

⚠️ **Important** :
- Ne committez JAMAIS les secrets dans le code
- Utilisez toujours les secrets GitHub pour les informations sensibles
- Changez régulièrement les mots de passe de test
- Les secrets ne sont visibles que lors du workflow, jamais affichés en logs

## Variables d'environnement (non-secrets)

Pour les valeurs non-sensibles, vous pouvez utiliser les variables (Settings → Variables):

```bash
gh variable set NODE_ENV -b "ci"
gh variable set ENVIRONMENT -b "staging"
gh variable set LOG_LEVEL -b "info"
```

## Pour désactiver certains jobs

Commentez les sections dans `.github/workflows/playwright.yml`:

```yaml
# allure:  # Décommenter pour désactiver le rapport Allure
#   name: Generate Allure Report
```

## Troubleshooting

### Le workflow échoue par "Missing secrets"
- Vérifiez que tous les secrets requis sont configurés
- Les secrets deviennent actifs après ~5 min

### GitHub Pages ne se déploie pas
- Allez dans Settings → Pages
- Sélectionnez "Deploy from a branch"
- Branch: `gh-pages`, Folder: `/ (root)`

### Notifications Slack ne fonctionnent pas
- Vérifiez l'URL du webhook
- Les webhooks expirent après 12 jours d'inactivité

---

Pour plus de détails : https://docs.github.com/en/actions/security-guides/encrypted-secrets
