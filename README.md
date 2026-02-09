# 💼 Portfolio Professionnel - Thomas COOPER

Portfolio moderne et responsive présentant mon parcours, mes compétences et mes projets en tant que Développeur Full Stack spécialisé en Big Data & Intelligence Artificielle.

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.15-FF0055?style=flat&logo=framer&logoColor=white)

## ✨ Fonctionnalités

- 🎨 **Design moderne** avec animations fluides (Framer Motion)
- 📱 **100% Responsive** - adapté à tous les appareils
- 🌊 **Effets de défilement** parallax et smooth scroll
- 🎠 **Carousel de projets** avec navigation automatique et manuelle
- 🎯 **Décorations animées** pour un design dynamique
- 📄 **Téléchargement** de CV et détail de compétences
- 🔗 **Liens sociaux** (GitHub, LinkedIn, Email, WhatsApp)
- ⚡ **Performance optimisée** avec Vite

## 🛠️ Technologies utilisées

### Frontend
- **React 18** - Bibliothèque UI
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS** - Framework CSS utility-first
- **Framer Motion** - Animations et transitions

### Bibliothèques
- **Lucide React** - Icônes modernes
- **Keen Slider** - Carousel performant

### Outils
- **ESLint** - Linting du code
- **PostCSS** - Traitement CSS

## 📂 Structure du projet

```
mon-portfolio/
├── src/
│   ├── components/         # Composants réutilisables
│   │   ├── BackgroundDecorations.jsx
│   │   ├── Button.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── ScrollToTopButton.jsx
│   │   ├── SocialButton.jsx
│   │   ├── TechMarquee.jsx
│   │   └── MarqueeItem.jsx
│   ├── sections/           # Sections de pages
│   │   ├── HeroSection.jsx
│   │   ├── AboutSection.jsx
│   │   ├── ProjectsSection.jsx
│   │   └── ContactSection.jsx
│   ├── hooks/              # Hooks personnalisés
│   │   ├── useCarousel.js
│   │   └── useClickOutside.js
│   ├── constants/          # Constantes et configuration
│   │   └── theme.js
│   ├── data/               # Données du portfolio
│   │   ├── projects.js
│   │   └── experience.js
│   ├── layout/             # Mise en page
│   │   └── Layout.jsx
│   └── pages/              # Pages
│       └── Home.jsx
├── public/                 # Assets statiques
│   └── images/
└── ARCHITECTURE.md         # Documentation technique
```

## 🚀 Installation et démarrage

### Prérequis
- Node.js 18+ et npm

### Installation

```bash
# Cloner le repository
git clone https://github.com/thoms-17/mon-portfolio.git

# Aller dans le dossier
cd mon-portfolio

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

### Build de production

```bash
# Créer le build optimisé
npm run build

# Prévisualiser le build
npm run preview
```

## 📋 Sections du portfolio

### 1. Hero Section
Présentation avec photo professionnelle, titre, description et boutons de téléchargement (CV, D2C).

### 2. Expériences
Timeline interactive présentant mon parcours professionnel et académique avec icônes différenciées (code/diplôme).

### 3. Projets
Carousel responsive affichant mes projets avec :
- Images illustratives
- Descriptions concises
- Liens GitHub / Téléchargement / Site live
- Navigation automatique avec pause au survol

### 4. Technologies
Marquee animé des technologies maîtrisées (HTML, CSS, JavaScript, React, PHP, Node.js, Docker, etc.).

### 5. Contact
Liens vers mes différents canaux de communication (GitHub, LinkedIn, Email, WhatsApp).

## 🎨 Architecture technique

Le projet suit une architecture modulaire et maintenable :

- **Composants réutilisables** : Button, BackgroundDecorations
- **Hooks personnalisés** : useCarousel, useClickOutside
- **Constantes centralisées** : Couleurs et animations dans `theme.js`
- **Séparation des responsabilités** : Logique métier dans les hooks, UI dans les composants

Voir [ARCHITECTURE.md](./ARCHITECTURE.md) pour plus de détails.

## 📱 Responsive Design

Le portfolio est optimisé pour tous les appareils :
- 📱 Mobile (< 768px) : Navigation burger, carousel 1 projet
- 💻 Tablette (768px - 1024px) : Layout adapté
- 🖥️ Desktop (> 1024px) : Layout complet, carousel 3 projets

## 🌐 Déploiement

Le portfolio peut être déployé sur :
- **GitHub Pages**
- **Vercel**
- **Netlify**
- **Azure Static Web Apps**

## 👨‍💻 Auteur

**Thomas COOPER**  
Développeur Full Stack - Big Data & Intelligence Artificielle

- 🌐 Portfolio : [thoms-17.github.io/mon-portfolio](https://thoms-17.github.io/mon-portfolio)
- 💼 LinkedIn : [thomas-cooper17](https://www.linkedin.com/in/thomas-cooper17)
- 🐙 GitHub : [thoms-17](https://github.com/thoms-17)
- 📧 Email : thomcooper04@gmail.com

## 📄 Licence

Ce projet est un portfolio personnel. Tous droits réservés.
