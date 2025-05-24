@echo off
title Monika Streaming Platform
echo 🎬 Démarrage de Monika Streaming Platform...
echo.

echo [1/3] Vérification des dépendances...
if not exist "node_modules" (
    echo Installation des dépendances frontend...
    npm install
)
if not exist "backend\node_modules" (
    echo Installation des dépendances backend...
    cd backend && npm install && cd ..
)

echo [2/3] Démarrage du backend...
start "Backend Server" cmd /k "cd /d %~dp0backend && npm run dev"
timeout /t 3 /nobreak >nul

echo [3/3] Démarrage du frontend...
start "Frontend Server" cmd /k "cd /d %~dp0 && npm run dev"
timeout /t 5 /nobreak >nul

echo Ouverture du navigateur...
start http://localhost:3000

echo.
echo ✅ Monika Streaming est maintenant démarré !
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend API: http://localhost:3001/api
echo 🏥 Santé du serveur: http://localhost:3001/api/health
echo.
echo 💡 Conseils:
echo   - Les serveurs s'exécutent dans des fenêtres séparées
echo   - Fermez les fenêtres pour arrêter les serveurs
echo   - Utilisez Ctrl+C dans chaque fenêtre pour un arrêt propre
echo.
echo Appuyez sur une touche pour fermer cette fenêtre...
pause >nul
