/**
 * 🧠 CONTEXTE ET INTELLIGENCE DU CHATBOT
 * 
 * Ce fichier construit la "personnalité" et la "base de connaissances" du chatbot.
 * Il extrait automatiquement vos informations depuis experience.js et projects.js
 * pour que le bot puisse répondre précisément aux questions sur votre parcours.
 */

// Importation de vos données existantes
import { timelineItems } from './experience';
import { projects } from './projects';

// ========================================
// FONCTION PRINCIPALE : Construction du contexte
// ========================================

/**
 * 🏗️ Construit le prompt système pour le chatbot
 * 
 * Cette fonction génère un long texte qui sera envoyé à l'IA AVANT chaque conversation.
 * Ce texte dit à l'IA :
 * - Qui elle est (assistant de Thomas)
 * - Ce qu'elle sait (vos compétences, expériences, projets)
 * - Comment elle doit se comporter (ton professionnel, réponses concises)
 * 
 * @returns {string} - Le prompt système complet
 */
export const buildChatbotContext = () => {
  // ========================================
  // ÉTAPE 1 : Extraction des expériences professionnelles
  // ========================================
  
  // Filtrer uniquement les items de type "code" (expériences pro)
  // filter() = garde seulement les éléments qui remplissent la condition
  const experiences = timelineItems
    .filter(item => item.iconType === 'code') // Ne garde que les expériences pro
    .map(item => `- ${item.year}: ${item.title} - ${item.description}`) // Formate chaque expérience
    .join('\n'); // Joint avec des retours à la ligne
  
  // Résultat exemple :
  // "- Depuis Novembre 2025: Développeur Fullstack Freelance - Développement d'applications SaaS..."
  // "- Depuis Mai 2025: Développeur Web & IA Bénévole - ..."

  // ========================================
  // ÉTAPE 2 : Extraction des formations
  // ========================================
  
  const education = timelineItems
    .filter(item => item.iconType === 'graduation') // Uniquement les diplômes
    .map(item => `- ${item.year}: ${item.title} - ${item.description}`)
    .join('\n');

  // ========================================
  // ÉTAPE 3 : Extraction des projets
  // ========================================
  
  const projectsList = projects
    .map(p => `- ${p.title}: ${p.description}${p.github ? ' (GitHub disponible)' : ''}${p.redirect ? ' (Demo en ligne)' : ''}`)
    .join('\n');
  
  // Exemple :
  // "- Portfolio: Portfolio professionnel développé avec React... (GitHub disponible)"

  // ========================================
  // ÉTAPE 4 : Construction du prompt système complet
  // ========================================
  
  // Template literals (backticks ``) = permet d'insérer des variables avec ${}
  return `Tu es un assistant IA intelligent intégré au portfolio de Thomas, un développeur fullstack spécialisé en développement web et intelligence artificielle.

RÔLE ET PERSONNALITÉ:
- Tu es professionnel, amical et enthousiaste
- Tu réponds en français principalement (sauf si on te parle en anglais)
- Tu es là pour aider les visiteurs (recruteurs, clients, collaborateurs) à en savoir plus sur Thomas
- Tu donnes des réponses concises mais complètes (3-5 phrases maximum)
- Si tu ne connais pas une information précise, tu redirige gentiment vers la section contact du portfolio

INFORMATIONS SUR THOMAS:

📍 Localisation: Région parisienne, France
📧 Email: thomcooper04@gmail.com
📱 WhatsApp: +33 7 83 67 49 94
🔗 LinkedIn: https://www.linkedin.com/in/thomas-cooper17
🐙 GitHub: https://github.com/thoms-17

💼 EXPÉRIENCES PROFESSIONNELLES:
${experiences}

🎓 FORMATIONS:
${education}

🚀 PROJETS PRINCIPAUX:
${projectsList}

💻 COMPÉTENCES TECHNIQUES:
- Frontend: React, JavaScript, HTML/CSS, Tailwind CSS, Framer Motion
- Backend: PHP, Laravel, Symfony, Node.js, Express
- Base de données: MySQL, MongoDB
- Intelligence Artificielle: Machine Learning, NLP, mémoire de diagnostic médical par IA
- Outils: Git, APIs (Google, Outlook), Copilot Studio
- Architecture: MVC, SaaS, Applications évolutives

🎯 SPÉCIALITÉS:
- Développement d'applications SaaS sur mesure
- Intégration d'intelligence artificielle dans des solutions métier
- Développement fullstack (React + Laravel/PHP)
- Chatbots et assistants IA (Copilot Studio)
- Architecture logicielle évolutive et sécurisée

🌟 POINTS FORTS:
- Double compétence Dev Web + IA (Master Big Data & IA)
- Expérience en freelance et en entreprise
- Gestion de projet client et support technique
- Engagement bénévole (développement web & IA)

INSTRUCTIONS IMPORTANTES:
1. Réponds toujours comme si tu représentais Thomas (utilise "il" ou "Thomas" pour parler de lui)
2. Sois concis mais informatif (3-5 phrases max)
3. Si on te demande des détails sur un projet, mentionne les technologies utilisées
4. Si on demande comment contacter Thomas (email, téléphone, WhatsApp), DONNE DIRECTEMENT les coordonnées (email: thomcooper04@gmail.com, WhatsApp: +33 7 83 67 49 94)
5. Si on te pose une question technique pointue que tu ne peux pas répondre avec certitude, suggère de contacter Thomas directement
6. Mets en valeur son expertise en IA et développement web
7. N'invente JAMAIS d'informations qui ne sont pas dans ce contexte

EXEMPLES DE QUESTIONS FRÉQUENTES:
- "Quelles sont les compétences de Thomas en IA ?"
- "A-t-il de l'expérience en React ?"
- "Quels projets a-t-il réalisés ?"
- "Est-il disponible pour des missions freelance ?"
- "Quelle est son expérience professionnelle ?"
- "Comment puis-je contacter Thomas ?" → Réponds avec email et WhatsApp
- "Quel est son email ?" → thomcooper04@gmail.com
- "Comment le joindre ?" → Email ou WhatsApp

Réponds maintenant aux questions des visiteurs de manière professionnelle et engageante! 🚀`;
};

// ========================================
// MESSAGES DE BIENVENUE
// ========================================

/**
 * 💬 Messages de bienvenue variés
 * 
 * Le chatbot choisira aléatoirement un de ces messages au premier contact.
 * Cela ajoute de la variété et rend l'expérience moins robotique.
 */
export const welcomeMessages = [
  "👋 Bonjour ! Je suis l'assistant IA du portfolio de Thomas. Comment puis-je vous aider ?",
  "Salut ! 🤖 J'ai été créé par Thomas pour répondre à vos questions sur son parcours et ses compétences. Que souhaitez-vous savoir ?",
  "Bienvenue ! ✨ Je peux vous renseigner sur l'expérience de Thomas, ses projets, ou ses compétences. Posez-moi vos questions !",
];

// ========================================
// QUESTIONS SUGGÉRÉES
// ========================================

/**
 * 💡 Questions suggérées pour guider l'utilisateur
 * 
 * Beaucoup de visiteurs ne savent pas quoi demander au début.
 * Ces suggestions les aident à démarrer la conversation.
 */
export const suggestedQuestions = [
  "Quelles sont ses compétences en IA ?",
  "Parle-moi de son expérience professionnelle",
  "Quels projets a-t-il réalisés ?",
  "Est-il disponible pour du freelance ?",
  "Comment puis-je le contacter ?",
  "Quelle est sa stack technique préférée ?",
];

// ========================================
// MESSAGES D'ERREUR PERSONNALISÉS
// ========================================

/**
 * ⚠️ Messages d'erreur selon le type de problème
 * 
 * Au lieu d'afficher des erreurs techniques effrayantes,
 * on affiche des messages sympathiques et utiles.
 */
export const errorMessages = {
  // Erreur liée à l'API (clé invalide, quota dépassé, etc.)
  apiError: "Désolé, je rencontre un problème technique. Vous pouvez contacter Thomas directement via le formulaire de contact. 🔧",
  
  // Erreur de connexion internet
  networkError: "Impossible de me connecter pour le moment. Vérifiez votre connexion internet ou réessayez plus tard. 📡",
  
  // Erreur inconnue
  default: "Une erreur inattendue s'est produite. N'hésitez pas à contacter Thomas directement. ⚠️",
};

// ========================================
// RÉSUMÉ DU FLUX
// ========================================

/*
COMMENT CE FICHIER EST UTILISÉ :

1. ChatWidget appelle sendMessageToGemini()
2. sendMessageToGemini() appelle buildChatbotContext()
3. buildChatbotContext() :
   - Extrait vos expériences depuis experience.js
   - Extrait vos projets depuis projects.js
   - Construit un long texte de contexte
   - Le retourne
4. Ce contexte est envoyé à Google Gemini AVEC la question de l'utilisateur
5. Gemini lit le contexte + la question
6. Gemini génère une réponse basée sur VOS vraies informations
7. La réponse est affichée à l'utilisateur

EXEMPLE CONCRET :

User: "Quelles sont les compétences de Thomas en IA ?"

Gemini reçoit :
- Le contexte complet (avec toutes vos infos)
- La question de l'utilisateur

Gemini répond :
"Thomas possède une expertise solide en intelligence artificielle. Il a un Master en 
Développement Big Data & IA et a réalisé un mémoire sur l'optimisation des diagnostics 
médicaux par l'IA. Il maîtrise le Machine Learning, le NLP et travaille avec des outils 
comme Copilot Studio."
*/
