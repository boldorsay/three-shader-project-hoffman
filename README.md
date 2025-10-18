# Three.js Shaders Project

Un projet Vite.js avec Three.js et des shaders personnalisés.

## Fonctionnalités

- ✅ Projet Vite.js configuré
- ✅ Three.js installé et configuré
- ✅ Shaders vertex et fragment personnalisés
- ✅ Plan géométrique avec matériau shader
- ✅ Animation en temps réel
- ✅ Gestion du redimensionnement de fenêtre

## Installation

```bash
yarn install
```

## Développement

```bash
yarn dev
```

## Structure du projet

```
src/
├── main.js              # Point d'entrée principal
└── shaders/
    ├── vertex.glsl     # Shader vertex
    └── fragment.glsl   # Shader fragment
```

## Shaders

### Vertex Shader
- Gère la position des vertices
- Passe les coordonnées UV et la position au fragment shader

### Fragment Shader
- Crée un motif animé avec des vagues de couleurs
- Utilise le temps pour l'animation
- Mélange plusieurs couleurs (bleu, rose, vert)

## Contrôles

Le plan tourne automatiquement et les couleurs s'animent en temps réel.
