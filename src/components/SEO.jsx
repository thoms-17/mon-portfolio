import { useSEO } from "../hooks/useSEO";

/**
 * Composant SEO pour gérer les métadonnées de page
 * Utilisation : <SEO title="..." description="..." />
 */
const SEO = ({ 
  title = "Thomas Cooper - Développeur Full Stack | Big Data & IA",
  description = "Portfolio professionnel de Thomas Cooper, développeur Full Stack spécialisé en Big Data et Intelligence Artificielle.",
  keywords = "Thomas Cooper, développeur full stack, React, PHP, Node.js, Big Data, Intelligence Artificielle",
  ogImage = "https://thoms-17.github.io/mon-portfolio/images/pp_pro.jpg",
  url = "https://thoms-17.github.io/mon-portfolio"
}) => {
  useSEO({ title, description, keywords, ogImage, url });
  return null;
};

export default SEO;
