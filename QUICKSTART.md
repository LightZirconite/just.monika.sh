# 🎬 Guide de Démarrage Rapide - Monika Streaming

## ✅ État du Projet

### 🎯 Fonctionnalités Implémentées
- ✅ Interface utilisateur moderne avec React + TypeScript
- ✅ Lecteur vidéo personnalisé avec contrôles avancés
- ✅ API Backend Express.js avec sécurité
- ✅ Navigation et recherche de vidéos
- ✅ Design responsive avec Tailwind CSS
- ✅ Animations avec Framer Motion
- ✅ Configuration Nginx pour la production

### 🚀 Serveurs Configurés
- **Frontend**: Port 3000 (Vite + React)
- **Backend**: Port 3001 (Express.js + Node.js)
- **Proxy**: Configuration Nginx disponible

## 📋 Instructions de Démarrage

### 1. Démarrage Automatique (Recommandé)
```bash
# Windows
start.bat

# Linux/Mac  
./start.sh
```

### 2. Démarrage Manuel

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

#### Terminal 2 - Frontend
```bash
npm run dev
```

### 3. Accès aux Services
- **Application**: http://localhost:3000
- **API Backend**: http://localhost:3001/api
- **Santé API**: http://localhost:3001/api/health

## 📁 Ajouter du Contenu

### Vidéos
1. Placez vos fichiers vidéo dans `public/videos/`
2. Formats supportés: `.mp4`, `.webm`, `.ogv`
3. Les vidéos apparaîtront automatiquement dans l'interface

### Miniatures
1. Ajoutez les images dans `public/videos/thumbnails/`
2. Nommez-les avec le même nom que la vidéo
3. Formats: `.jpg`, `.png`, `.webp`

## 🧪 Tests
```bash
# Test de l'API
node test-api.js

# Vérification des ports
netstat -ano | findstr "3000\|3001"
```

## 🛠️ Développement

### Structure des Composants
- `src/components/` - Composants réutilisables
- `src/pages/` - Pages de l'application
- `src/types/` - Définitions TypeScript

### API Endpoints
- `GET /api/videos` - Liste des vidéos
- `GET /api/categories` - Catégories
- `GET /api/stats` - Statistiques
- `GET /api/health` - Santé du serveur

## 🎨 Personnalisation
- Styles: `src/index.css` + Tailwind CSS
- Configuration: `tailwind.config.js`
- Couleurs: Thème sombre avec accent bleu

---

**🎉 Votre plateforme de streaming Monika est prête !**

Pour toute question, consultez le README.md complet ou les commentaires dans le code.
