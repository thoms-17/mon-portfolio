/**
 * Configuration SEO centralisée
 * Mettez à jour ces valeurs pour modifier les métadonnées du site
 */

export const seoConfig = {
  // Informations de base
  siteName: "Thomas Cooper - Portfolio",
  siteUrl: "https://thoms-17.github.io/mon-portfolio",
  author: "Thomas Cooper",
  
  // Métadonnées par défaut
  defaultTitle: "Thomas Cooper - Développeur Full Stack | Big Data & Intelligence Artificielle",
  defaultDescription: "Portfolio professionnel de Thomas Cooper, développeur Full Stack spécialisé en Big Data et Intelligence Artificielle. Expertise en React, PHP, Node.js, Python. Disponible en freelance.",
  defaultKeywords: "Thomas Cooper, développeur full stack, développeur freelance, React, PHP, Node.js, Python, Big Data, Intelligence Artificielle, IA, développement web, portfolio développeur, Paris, Île-de-France",
  defaultImage: "https://thoms-17.github.io/mon-portfolio/images/pp_pro.jpg",
  
  // Réseaux sociaux
  social: {
    github: "https://github.com/thoms-17",
    linkedin: "https://www.linkedin.com/in/thomas-cooper17",
    email: "thomcooper04@gmail.com",
    whatsapp: "https://wa.me/33783674994",
  },
  
  // Langue et localisation
  locale: "fr_FR",
  language: "fr",
  
  // Mots-clés par section (pour un SEO encore plus précis)
  sections: {
    hero: {
      title: "Thomas Cooper - Développeur Full Stack | Portfolio Professionnel",
      description: "Développeur Full Stack spécialisé en Big Data et Intelligence Artificielle. Jeune diplômé passionné par le développement web moderne.",
    },
    projects: {
      title: "Projets - Thomas Cooper | Portfolio Développeur",
      description: "Découvrez mes projets en développement web, IA et Big Data : gestionnaire de bibliothèque PHP, Pokédex Node.js, mémoire sur l'IA médicale.",
      keywords: "projets développeur, portfolio projets, React projects, PHP MVC, Node.js, Intelligence Artificielle médicale",
    },
    experience: {
      title: "Expériences - Thomas Cooper | Parcours Professionnel",
      description: "Mon parcours professionnel : développeur freelance, alternance en développement web, Master Big Data & IA, Bachelor Ingénierie du Web.",
      keywords: "expérience développeur, parcours professionnel, alternance développeur, formation développeur, master big data",
    },
    contact: {
      title: "Contact - Thomas Cooper | Développeur Freelance",
      description: "Contactez-moi pour vos projets de développement web, Big Data ou IA. Disponible en freelance. GitHub, LinkedIn, Email.",
      keywords: "contact développeur, freelance disponible, recrutement développeur, collaboration développeur",
    },
  },
};

/**
 * Fonction helper pour générer les métadonnées complètes
 */
export const getSEOData = (section = null) => {
  const base = {
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    keywords: seoConfig.defaultKeywords,
    image: seoConfig.defaultImage,
    url: seoConfig.siteUrl,
  };

  if (section && seoConfig.sections[section]) {
    return {
      ...base,
      ...seoConfig.sections[section],
    };
  }

  return base;
};
