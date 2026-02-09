# 📁 Structure du projet

## 🎨 Composants

### Composants de base
- **Button.jsx** - Composant bouton réutilisable avec variantes (primary, secondary) et tailles
- **BackgroundDecorations.jsx** - Décorations d'arrière-plan réutilisables (taches animées indigo)
- **SocialButton.jsx** - Boutons de réseaux sociaux avec icônes
- **ProjectCard.jsx** - Carte de projet avec image, description et actions
- **Navbar.jsx** - Navigation responsive avec menu burger
- **ScrollToTopButton.jsx** - Bouton de retour en haut
- **TechMarquee.jsx** - Carrousel de logos de technologies
- **MarqueeItem.jsx** - Élément de carrousel animé

## 🪝 Hooks personnalisés

### useCarousel
Gère toute la logique d'un carousel :
- Navigation (suivant, précédent, aller à)
- Auto-slide avec pause au survol
- Responsive (adapte le nombre d'éléments par slide)

**Utilisation :**
```jsx
const { activeIndex, slides, nextSlide, prevSlide, goToSlide, pauseAutoSlide, resumeAutoSlide } = useCarousel(items, itemsPerSlide);
```

### useClickOutside
Détecte les clics à l'extérieur d'éléments spécifiques.

**Utilisation :**
```jsx
useClickOutside([ref1, ref2], callbackFunction, isActive);
```

## 🎨 Constantes

### theme.js
Centralise les couleurs, animations et transitions :
- **colors** - Palette de couleurs du projet
- **animations** - Animations Framer Motion réutilisables (fadeInUp, fadeIn, scaleIn)
- **transitions** - Timings de transitions

**Utilisation :**
```jsx
import { colors, animations, transitions } from "../constants/theme";
<motion.div {...animations.fadeInUp} />
```

## 📄 Sections

- **HeroSection.jsx** - Section d'accueil avec présentation
- **AboutSection.jsx** - Expériences et timeline
- **ProjectsSection.jsx** - Carrousel de projets
- **ContactSection.jsx** - Coordonnées et réseaux sociaux

## 🗂️ Data

- **projects.js** - Liste des projets
- **experience.js** - Expériences professionnelles et formations

## ✅ Bonnes pratiques appliquées

1. **DRY (Don't Repeat Yourself)** - Code dupliqué extrait en composants/hooks
2. **Séparation des responsabilités** - Logique métier dans les hooks, UI dans les composants
3. **Composants réutilisables** - Button, BackgroundDecorations
4. **Constantes centralisées** - Couleurs et animations dans theme.js
5. **Code lisible** - Noms explicites, structure claire
