# Vidéos de démonstration

Placez vos fichiers vidéos dans ce dossier pour qu'ils soient servis par l'API backend.

Format supportés :
- MP4 (recommandé)
- WebM
- OGV

Exemple de structure :
```
public/videos/
├── sample-video-1.mp4
├── sample-video-2.mp4
└── thumbnails/
    ├── sample-video-1.jpg
    └── sample-video-2.jpg
```

Les vidéos seront automatiquement détectées par l'API `/api/videos`.
