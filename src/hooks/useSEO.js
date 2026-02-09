import { useEffect } from "react";

/**
 * Hook personnalisé pour gérer les métadonnées SEO
 * Compatible avec React 19 sans dépendances externes
 */
export const useSEO = ({ title, description, keywords, ogImage, url }) => {
  useEffect(() => {
    if (title) {
      document.title = title;
      updateMetaTag("og:title", title);
      updateMetaTag("twitter:title", title);
    }

    if (description) {
      updateMetaTag("description", description);
      updateMetaTag("og:description", description);
      updateMetaTag("twitter:description", description);
    }

    if (keywords) {
      updateMetaTag("keywords", keywords);
    }

    if (ogImage) {
      updateMetaTag("og:image", ogImage);
      updateMetaTag("twitter:image", ogImage);
    }

    if (url) {
      updateMetaTag("og:url", url);
      updateLinkTag("canonical", url);
    }
  }, [title, description, keywords, ogImage, url]);
};

const updateMetaTag = (name, content) => {
  let element = document.querySelector(`meta[name="${name}"]`) ||
                 document.querySelector(`meta[property="${name}"]`);
  
  if (element) {
    element.setAttribute("content", content);
  } else {
    element = document.createElement("meta");
    if (name.startsWith("og:") || name.startsWith("twitter:")) {
      element.setAttribute("property", name);
    } else {
      element.setAttribute("name", name);
    }
    element.setAttribute("content", content);
    document.head.appendChild(element);
  }
};

const updateLinkTag = (rel, href) => {
  let element = document.querySelector(`link[rel="${rel}"]`);
  
  if (element) {
    element.setAttribute("href", href);
  } else {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    element.setAttribute("href", href);
    document.head.appendChild(element);
  }
};
