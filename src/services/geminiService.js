/**
 * 🤖 SERVICE GEMINI API
 * 
 * Ce fichier gère toute la communication avec l'API Google Gemini.
 * C'est ici qu'on envoie les questions des utilisateurs et qu'on reçoit les réponses de l'IA.
 * 
 * Documentation officielle : https://ai.google.dev/gemini-api/docs
 */

// ========================================
// CONFIGURATION
// ========================================

// Récupération de la clé API depuis le fichier .env
// import.meta.env = objet Vite contenant toutes les variables d'environnement
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// URL de l'API Gemini (endpoint = adresse web de l'API)
// gemini-2.5-flash = modèle IA stable (juin 2025), rapide et performant
// 1M tokens input, 65K tokens output - Parfait pour un chatbot
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

// ========================================
// FONCTION PRINCIPALE
// ========================================

/**
 * 📤 Envoie un message à l'IA Gemini et récupère la réponse
 * 
 * @param {string} userMessage - La question de l'utilisateur (ex: "Quelles sont tes compétences en IA ?")
 * @param {Array} conversationHistory - Historique des messages précédents (pour le contexte)
 * @param {string} systemContext - Instructions pour le bot (qui il est, ce qu'il sait sur vous)
 * @returns {Promise<string>} - La réponse générée par l'IA
 * 
 * EXEMPLE D'UTILISATION :
 * const response = await sendMessageToGemini(
 *   "Quels sont tes projets ?",
 *   [],
 *   "Tu es l'assistant de Thomas, développeur fullstack..."
 * );
 */
export async function sendMessageToGemini(userMessage, conversationHistory = [], systemContext = '') {
  try {
    // ========================================
    // ÉTAPE 1 : Vérification de la clé API
    // ========================================
    
    if (!GEMINI_API_KEY) {
      throw new Error('❌ Clé API Gemini manquante. Veuillez configurer VITE_GEMINI_API_KEY dans votre fichier .env');
    }

    // ========================================
    // ÉTAPE 2 : Construction du prompt complet
    // ========================================
    
    // Le "prompt" = toutes les instructions envoyées à l'IA
    // On combine 3 choses :
    // 1. Le contexte système (qui est le bot, que sait-il sur vous)
    // 2. L'historique de conversation (pour la cohérence)
    // 3. Le nouveau message de l'utilisateur
    
    const fullPrompt = systemContext 
      ? `${systemContext}\n\nConversation:\n${formatConversationHistory(conversationHistory)}\n\nUser: ${userMessage}\nAssistant:`
      : `${formatConversationHistory(conversationHistory)}\n\nUser: ${userMessage}\nAssistant:`;

    // ========================================
    // ÉTAPE 3 : Appel HTTP à l'API Gemini
    // ========================================
    
    // fetch() = fonction JavaScript pour faire des requêtes HTTP
    // On ajoute ?key=... à l'URL pour s'authentifier
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST', // POST = on envoie des données
      headers: {
        'Content-Type': 'application/json', // On envoie du JSON
      },
      body: JSON.stringify({
        // Structure JSON attendue par Google Gemini
        
        contents: [{
          parts: [{
            text: fullPrompt // Notre prompt complet
          }]
        }],
        
        // ========================================
        // Configuration de génération
        // ========================================
        generationConfig: {
          // temperature = créativité de l'IA (0 = robotique, 1 = très créatif)
          // 0.7 = bon équilibre entre précision et naturel
          temperature: 0.7,
          
          // topK = nombre de mots candidats considérés à chaque étape
          // Plus élevé = plus de variété
          topK: 40,
          
          // topP = probabilité cumulative des tokens considérés
          // 0.95 = considère 95% des options les plus probables
          topP: 0.95,
          
          // maxOutputTokens = longueur maximale de la réponse
          // 1 token ≈ 0.75 mot en français
          // 1024 tokens ≈ 768 mots (suffisant pour une réponse de chatbot)
          maxOutputTokens: 1024,
        },
        
        // ========================================
        // Filtres de sécurité (éviter contenu inapproprié)
        // ========================================
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE', // Bloque harcèlement
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE', // Bloque discours haineux
          },
        ],
      }),
    });

    // ========================================
    // ÉTAPE 4 : Vérification de la réponse HTTP
    // ========================================
    
    // response.ok = true si le code HTTP est 200-299 (succès)
    // false si 400-500 (erreur)
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`❌ Erreur API Gemini: ${errorData.error?.message || response.statusText}`);
    }

    // ========================================
    // ÉTAPE 5 : Extraction de la réponse
    // ========================================
    
    // Convertir la réponse HTTP en objet JavaScript
    const data = await response.json();
    
    // Navigation dans la structure JSON retournée par Gemini
    // Structure : data.candidates[0].content.parts[0].text
    const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    // Vérification que la réponse existe
    if (!botResponse) {
      throw new Error('❌ Aucune réponse valide reçue de Gemini');
    }

    // Retourner la réponse (sans espaces inutiles)
    return botResponse.trim();
    
  } catch (error) {
    // ========================================
    // GESTION DES ERREURS
    // ========================================
    
    console.error('❌ Erreur lors de l\'appel à Gemini:', error);
    throw error; // Propager l'erreur pour que le composant React puisse la gérer
  }
}

// ========================================
// FONCTIONS UTILITAIRES
// ========================================

/**
 * 📝 Formate l'historique de conversation pour le contexte
 * 
 * L'IA a besoin de comprendre la conversation précédente pour donner
 * des réponses cohérentes et contextuelles.
 * 
 * @param {Array} history - Tableau d'objets contenant les messages
 *                          Format : [{role: 'user'|'bot', message: 'texte'}]
 * @returns {string} - Historique formaté en texte
 * 
 * EXEMPLE :
 * Input : [
 *   {role: 'user', message: 'Bonjour'},
 *   {role: 'bot', message: 'Salut ! Comment puis-je t\'aider ?'},
 *   {role: 'user', message: 'Quels sont tes projets ?'}
 * ]
 * Output : 
 * "User: Bonjour
 *  Assistant: Salut ! Comment puis-je t'aider ?
 *  User: Quels sont tes projets ?"
 */
function formatConversationHistory(history) {
  // Si pas d'historique, retourner chaîne vide
  if (!history || history.length === 0) return '';
  
  // Transformer chaque message en ligne de texte
  return history
    .map(item => {
      // Déterminer le rôle (User ou Assistant)
      const role = item.role === 'user' ? 'User' : 'Assistant';
      return `${role}: ${item.message}`;
    })
    .join('\n'); // Joindre avec des retours à la ligne
}

/**
 * 🧪 Fonction de test de connexion à l'API
 * 
 * Utile pour vérifier que votre clé API fonctionne correctement.
 * 
 * @returns {Promise<boolean>} - true si la connexion fonctionne
 * 
 * UTILISATION :
 * const isConnected = await testGeminiConnection();
 * if (isConnected) console.log('✅ API OK');
 */
export async function testGeminiConnection() {
  try {
    await sendMessageToGemini('Hello', [], 'Réponds simplement "OK" pour confirmer que tu es connecté.');
    return true;
  } catch (error) {
    console.error('❌ Test de connexion Gemini échoué:', error);
    return false;
  }
}

// ========================================
// RÉSUMÉ DU FLUX DE DONNÉES
// ========================================

/*
1. L'utilisateur tape une question dans le ChatWidget
2. ChatWidget appelle sendMessageToGemini(question, historique, contexte)
3. Cette fonction :
   - Vérifie la clé API
   - Construit le prompt complet
   - Envoie une requête HTTP POST à Google
   - Attend la réponse
   - Extrait le texte de la réponse
   - Le retourne au ChatWidget
4. ChatWidget affiche la réponse à l'utilisateur
*/
