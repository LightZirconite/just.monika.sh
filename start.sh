#!/bin/bash

# Couleurs pour un meilleur affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🎬 Démarrage de Monika Streaming Platform...${NC}"
echo

# Vérification et installation des dépendances
echo -e "${YELLOW}[1/4] Vérification des dépendances...${NC}"
if [ ! -d "node_modules" ]; then
    echo "Installation des dépendances frontend..."
    npm install
fi

if [ ! -d "backend/node_modules" ]; then
    echo "Installation des dépendances backend..."
    cd backend && npm install && cd ..
fi

# Démarrage du backend
echo -e "${YELLOW}[2/4] Démarrage du backend...${NC}"
cd backend && npm run dev &
BACKEND_PID=$!
cd ..
sleep 3

# Démarrage du frontend
echo -e "${YELLOW}[3/4] Démarrage du frontend...${NC}"
npm run dev &
FRONTEND_PID=$!
sleep 5

# Ouverture du navigateur (si xdg-open est disponible)
echo -e "${YELLOW}[4/4] Ouverture du navigateur...${NC}"
if command -v xdg-open > /dev/null; then
    xdg-open http://localhost:3000
elif command -v open > /dev/null; then
    open http://localhost:3000
else
    echo "Veuillez ouvrir manuellement: http://localhost:3000"
fi

echo
echo -e "${GREEN}✅ Monika Streaming est maintenant démarré !${NC}"
echo -e "${BLUE}📱 Frontend: http://localhost:3000${NC}"
echo -e "${BLUE}🔧 Backend API: http://localhost:3001/api${NC}"
echo -e "${BLUE}🏥 Santé du serveur: http://localhost:3001/api/health${NC}"
echo
echo -e "${YELLOW}💡 Pour arrêter les serveurs, appuyez sur Ctrl+C${NC}"
echo

# Fonction de nettoyage pour arrêter les processus
cleanup() {
    echo -e "\n${RED}🛑 Arrêt des serveurs...${NC}"
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    echo -e "${GREEN}✅ Serveurs arrêtés proprement${NC}"
    exit 0
}

# Capturer Ctrl+C et autres signaux
trap cleanup SIGINT SIGTERM

# Attendre indéfiniment (jusqu'à Ctrl+C)
echo -e "${YELLOW}Serveurs en cours d'exécution... (PID Backend: $BACKEND_PID, PID Frontend: $FRONTEND_PID)${NC}"
wait
trap cleanup SIGINT

# Attendre indéfiniment
wait
