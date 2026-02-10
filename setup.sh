#!/bin/bash
# Script de préparation du projet

echo "🚀 Initialisation du projet Playwright..."

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    exit 1
fi

echo "✅ Node.js: $(node -v)"
echo "✅ npm: $(npm -v)"

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install

# Installer Playwright
echo "🎭 Installation des navigateurs Playwright..."
npx playwright install

# Copier l'exemple .env
if [ ! -f .env ]; then
    echo "⚙️ Création du fichier .env..."
    cp .env.example .env
fi

echo ""
echo "✅ Projet prêt ! Commandes disponibles:"
echo ""
echo "  npm test              - Exécuter tous les tests"
echo "  npm run test:ui       - Exécuter en mode UI"
echo "  npm run test:smoke    - Exécuter les tests smoke"
echo "  npm run test:e2e      - Exécuter les tests E2E"
echo "  npm run test:api      - Exécuter les tests API"
echo "  npm run test:headed   - Exécuter avec navigateur visible"
echo ""
