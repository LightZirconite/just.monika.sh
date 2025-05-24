# Monika Streaming Platform

Une plateforme de streaming vidéo moderne construite avec React, TypeScript, Express.js et Nginx.

## 🚀 Démarrage rapide

### Windows
```bash
# Double-cliquez sur le fichier ou exécutez dans un terminal
start.bat
```

### Linux/macOS
```bash
# Rendez le script exécutable (une seule fois)
chmod +x start.sh

# Lancez la plateforme
./start.sh
```

### Démarrage manuel
```bash
# Backend (Terminal 1)
cd backend
npm install
npm run dev

# Frontend (Terminal 2) 
npm install
npm run dev
```

## 📱 Accès à l'application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **Santé du serveur**: http://localhost:3001/api/health

## 🚀 Fonctionnalités

### Frontend
- **Interface moderne** avec React 18 + TypeScript
- **Design responsive** avec Tailwind CSS
- **Animations fluides** avec Framer Motion
- **Lecteur vidéo personnalisé** avec contrôles avancés
- **Navigation intuitive** et recherche en temps réel
- **Optimisé pour mobile** et desktop

### Backend
- **API RESTful** avec Express.js
- **Gestion des vidéos** (upload, streaming, métadonnées)
- **Système de recherche** et filtrage avancé
- **Statistiques** et analytics
- **Sécurité renforcée** avec Helmet et rate limiting

### Infrastructure
- **Proxy inverse Nginx** pour la performance
- **Configuration de production** prête à déployer
- **Optimisation du streaming** vidéo
- **Compression et cache** automatiques

## 📋 Prérequis

- Node.js 18+ 
- npm ou yarn
- Nginx (pour la production)

## 🛠️ Installation

### 1. Cloner le projet
```bash
git clone https://github.com/votre-username/monika-streaming.git
cd monika-streaming
```

### 2. Installation Frontend
```bash
npm install
```

### 3. Installation Backend
```bash
cd backend
npm install
```

### 4. Configuration
Copiez et configurez les variables d'environnement :
```bash
cp backend/.env.example backend/.env
```

## 🚀 Démarrage

### Mode développement
```bash
# Démarrer frontend et backend simultanément
npm start

# Ou séparément :
# Frontend (port 3000)
npm run dev

# Backend (port 3001)
npm run backend
```

### Mode production

#### Avec Docker (recommandé)
```bash
docker-compose up -d
```

#### Manuel
```bash
# Build du frontend
npm run build

# Démarrage du backend
cd backend
npm start

# Configuration Nginx
sudo cp nginx/monika-streaming.conf /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/monika-streaming.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 📁 Ajouter des vidéos

1. Placez vos fichiers vidéo dans `public/videos/`
2. Ajoutez les miniatures dans `public/videos/thumbnails/`
3. Les vidéos apparaîtront automatiquement dans l'interface

Formats supportés: MP4, WebM, OGV

## 📁 Structure du projet

```
monika-streaming/
├── src/                          # Code source frontend
│   ├── components/              # Composants React réutilisables
│   │   ├── Navbar.tsx          # Navigation principale
│   │   ├── VideoCard.tsx       # Carte d'affichage vidéo
│   │   └── CustomVideoPlayer.tsx # Lecteur vidéo personnalisé
│   ├── pages/                  # Pages de l'application
│   │   ├── Home.tsx            # Page d'accueil
│   │   ├── Browse.tsx          # Page de navigation/recherche
│   │   └── VideoPlayer.tsx     # Page de lecture vidéo
│   ├── hooks/                  # Hooks React personnalisés
│   ├── utils/                  # Utilitaires et helpers
│   └── types/                  # Types TypeScript
├── backend/                    # API Backend
│   ├── server.js              # Serveur Express principal
│   ├── routes/                # Routes API
│   ├── middleware/            # Middlewares personnalisés
│   ├── models/                # Modèles de données
│   └── utils/                 # Utilitaires backend
├── nginx/                     # Configuration Nginx
│   └── monika-streaming.conf  # Configuration du proxy
├── public/                    # Fichiers statiques
└── docs/                      # Documentation
```

## 🎥 Fonctionnalités du lecteur vidéo

- **Contrôles personnalisés** avec design moderne
- **Support des raccourcis clavier** (espace, flèches, etc.)
- **Mode plein écran** natif
- **Contrôle du volume** avec molette
- **Barre de progression** interactive
- **Saut temporel** (±10 secondes)
- **Paramètres de qualité** (futur)
- **Sous-titres** (futur)

## 🔧 API Endpoints

### Vidéos
- `GET /api/videos` - Liste des vidéos avec pagination
- `GET /api/videos/:id` - Détails d'une vidéo
- `GET /api/videos/:id/related` - Vidéos recommandées
- `GET /api/search?q=term` - Recherche de vidéos

### Catégories
- `GET /api/categories` - Liste des catégories

### Statistiques
- `GET /api/stats` - Statistiques globales
- `GET /api/health` - Santé de l'API

## 🎨 Personnalisation

### Thème et couleurs
Les couleurs sont configurées dans `tailwind.config.js` :
```javascript
colors: {
  primary: { /* Couleurs principales */ },
  dark: { /* Thème sombre */ }
}
```

### Composants
Tous les composants utilisent Tailwind CSS et sont entièrement personnalisables.

## 🔒 Sécurité

- **Headers de sécurité** avec Helmet
- **Rate limiting** pour prévenir les abus
- **CORS** configuré correctement
- **Validation des entrées** côté backend
- **CSP** (Content Security Policy) configuré

## 📱 Responsive Design

- **Mobile-first** approach
- **Breakpoints** optimisés pour tous les écrans
- **Touch gestures** pour mobile
- **Navigation adaptive** selon la taille d'écran

## 🚀 Optimisations

### Performance
- **Lazy loading** des composants
- **Optimisation des images** et vidéos
- **Code splitting** automatique avec Vite
- **Compression GZIP** via Nginx

### SEO
- **Meta tags** dynamiques
- **URLs optimisées** pour le référencement
- **Structured data** pour les vidéos
- **Sitemap** automatique

## 🛠️ Technologies utilisées

### Frontend
- **React 18** - Framework UI
- **TypeScript** - Typage statique
- **Vite** - Build tool moderne
- **Tailwind CSS** - Framework CSS utilitaire
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Axios** - Client HTTP

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Helmet** - Sécurité
- **Morgan** - Logging
- **CORS** - Cross-Origin Resource Sharing
- **Compression** - Compression des réponses

### Infrastructure
- **Nginx** - Proxy inverse et serveur web
- **Docker** - Conteneurisation (optionnel)

## 🤝 Contribution

1. Fork le projet
2. Créez votre branche (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Committez vos changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou problème :
- 📧 Email : support@monika-streaming.com
- 🐛 Issues : [GitHub Issues](https://github.com/votre-username/monika-streaming/issues)
- 📖 Documentation : [Wiki du projet](https://github.com/votre-username/monika-streaming/wiki)

---

Développé avec ❤️ par l'équipe Monika Streaming
