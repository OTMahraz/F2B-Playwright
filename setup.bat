@echo off
REM Script de préparation du projet pour Windows

echo.
echo ========================================
echo    🚀 Initialisation Playwright
echo ========================================
echo.

REM Vérifier Node.js
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ Node.js n'est pas installé
    echo Téléchargez-le sur https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js: 
node -v
echo ✅ npm: 
npm -v

REM Installer les dépendances
echo.
echo 📦 Installation des dépendances...
call npm install

if errorlevel 1 (
    echo ❌ Erreur lors de l'installation
    pause
    exit /b 1
)

REM Installer Playwright
echo.
echo 🎭 Installation des navigateurs Playwright...
call npx playwright install

if errorlevel 1 (
    echo ❌ Erreur lors de l'installation des navigateurs
    pause
    exit /b 1
)

REM Créer .env s'il n'existe pas
if not exist .env (
    echo.
    echo ⚙️  Création du fichier .env...
    copy .env.example .env
    echo ⚠️  N'oubliez pas de configurer les variables dans .env !
)

echo.
echo ========================================
echo    ✅ Projet prêt !
echo ========================================
echo.
echo Commandes disponibles:
echo.
echo   npm test              - Exécuter tous les tests
echo   npm run test:ui       - Exécuter en mode UI
echo   npm run test:smoke    - Exécuter les tests smoke
echo   npm run test:e2e      - Exécuter les tests E2E
echo   npm run test:api      - Exécuter les tests API
echo   npm run test:headed   - Exécuter avec navigateur visible
echo   npm run test:debug    - Mode debug
echo.
echo Documentation: see README.md et TESTING_GUIDE.md
echo.
pause
