/**
 * 💬 COMPOSANT CHATWIDGET - Interface utilisateur du chatbot IA
 * 
 * Ce composant React affiche le chatbot sous forme de widget flottant.
 * Il gère toute l'interface : bouton, fenêtre de chat, messages, input, animations.
 * 
 * ARCHITECTURE :
 * - Bouton flottant (en bas à droite) → ouvre/ferme le chat
 * - Fenêtre de chat → affiche les messages + input
 * - Gestion de l'état (messages, chargement, erreurs)
 * - Communication avec geminiService pour envoyer/recevoir messages
 */

// ========================================
// IMPORTS
// ========================================

// React hooks
import { useState, useRef, useEffect } from 'react';

// Icônes (Lucide React = bibliothèque d'icônes)
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';

// Framer Motion = bibliothèque d'animations
import { motion, AnimatePresence } from 'framer-motion';

// Notre service API
import { sendMessageToGemini } from '../services/geminiService';

// Hook personnalisé pour détecter les clics en dehors
import { useClickOutside } from '../hooks/useClickOutside';

// Notre base de connaissances
import { 
  buildChatbotContext, 
  welcomeMessages, 
  suggestedQuestions, 
  errorMessages 
} from '../data/chatbotContext';

// ========================================
// COMPOSANT TYPEWRITER (effet de frappe)
// ========================================

/**
 * Composant qui affiche du texte progressivement, caractère par caractère
 * Simule l'effet d'écriture en temps réel comme ChatGPT
 */
const TypewriterText = ({ text, speed = 20 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setDisplayedText(''); // Réinitialiser
    setIsTyping(true);
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span>
      {displayedText}
    </span>
  );
};

// ========================================
// COMPOSANT PRINCIPAL
// ========================================

const ChatWidget = () => {
  // ========================================
  // GESTION DE L'ÉTAT (State Management)
  // ========================================
  
  /**
   * État = ce qui change dans l'interface
   * Chaque fois qu'un état change, React re-rend le composant
   */
  
  // Le chat est-il ouvert ou fermé ?
  const [isOpen, setIsOpen] = useState(false);
  
  // Liste des messages (historique de conversation)
  // Format: [{role: 'user'|'bot', message: 'texte', timestamp: 123456}]
  const [messages, setMessages] = useState([]);
  
  // Texte dans l'input (ce que l'utilisateur tape)
  const [inputValue, setInputValue] = useState('');
  
  // Est-on en train d'attendre une réponse de l'IA ?
  const [isLoading, setIsLoading] = useState(false);
  
  // Y a-t-il eu une erreur ?
  const [hasError, setHasError] = useState(false);

  // ========================================
  // RÉFÉRENCES (Refs)
  // ========================================
  
  /**
   * Refs = pointeurs vers des éléments du DOM
   * Permet de manipuler directement le HTML
   */
  
  // Référence au bas de la zone de messages (pour auto-scroll)
  const messagesEndRef = useRef(null);
  
  // Référence au textarea (pour focus automatique et auto-resize)
  const inputRef = useRef(null);
  
  // Référence à la fenêtre de chat (pour détecter les clics en dehors)
  const chatWindowRef = useRef(null);

  // ========================================
  // EFFETS (Effects)
  // ========================================
  
  /**
   * useEffect = exécute du code quand quelque chose change
   * Syntaxe : useEffect(() => { code }, [déclencheurs])
   */

  // EFFET 1 : Message de bienvenue au premier chargement
  useEffect(() => {
    // Si le chat est ouvert ET qu'il n'y a pas encore de messages
    if (isOpen && messages.length === 0) {
      // Choisir un message de bienvenue aléatoire
      const randomWelcome = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
      
      // Ajouter le message de bienvenue
      setMessages([{ 
        role: 'bot', 
        message: randomWelcome, 
        timestamp: Date.now() // Timestamp = horodatage (millisecondes depuis 1970)
      }]);
    }
  }, [isOpen, messages.length]); // Se déclenche quand isOpen ou messages.length change

  // EFFET 2 : Auto-scroll vers le bas quand nouveaux messages
  useEffect(() => {
    // scrollIntoView() = fait défiler jusqu'à l'élément
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]); // Se déclenche quand messages change

  // EFFET 3 : Focus automatique sur le textarea quand le chat s'ouvre
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus(); // Met le curseur dans le textarea
    }
  }, [isOpen]); // Se déclenche quand isOpen change

  // EFFET 4 : Auto-resize du textarea en fonction du contenu
  useEffect(() => {
    if (inputRef.current) {
      // Réinitialiser la hauteur pour calculer la nouvelle
      inputRef.current.style.height = 'auto';
      // Ajuster la hauteur au contenu (max 150px)
      const newHeight = Math.min(inputRef.current.scrollHeight, 150);
      inputRef.current.style.height = `${newHeight}px`;
    }
  }, [inputValue]); // Se déclenche quand inputValue change

  // EFFET 5 : Fermer le chat si clic en dehors
  useClickOutside(
    [chatWindowRef], // Références à surveiller
    () => setIsOpen(false), // Callback : fermer le chat
    isOpen // Actif uniquement si le chat est ouvert
  );

  // ========================================
  // FONCTIONS MÉTIER (Business Logic)
  // ========================================

  /**
   * 📤 Gère l'envoi d'un message
   * 
   * FLUX :
   * 1. Ajouter le message utilisateur à l'historique
   * 2. Appeler l'API Gemini
   * 3. Ajouter la réponse du bot à l'historique
   * 4. Gérer les erreurs
   */
  const handleSendMessage = async (message = inputValue) => {
    // Vérifications
    if (!message.trim() || isLoading) return; // Si vide ou en chargement, ne rien faire

    const userMessage = message.trim();
    setInputValue(''); // Vider l'input
    setHasError(false); // Réinitialiser l'erreur

    // ÉTAPE 1 : Ajouter le message utilisateur
    const newUserMessage = { 
      role: 'user', 
      message: userMessage, 
      timestamp: Date.now() 
    };
    setMessages(prev => [...prev, newUserMessage]); // prev = valeur précédente
    setIsLoading(true); // Activer l'indicateur de chargement

    try {
      // ÉTAPE 2 : Préparer l'historique pour le contexte
      // On transforme le format pour l'API
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        message: msg.message,
      }));

      // ÉTAPE 3 : Appeler l'API Gemini
      const botResponse = await sendMessageToGemini(
        userMessage,              // La question
        conversationHistory,       // L'historique
        buildChatbotContext()      // Le contexte (qui est le bot, ce qu'il sait)
      );

      // ÉTAPE 4 : Ajouter la réponse du bot
      setMessages(prev => [...prev, { 
        role: 'bot', 
        message: botResponse, 
        timestamp: Date.now() 
      }]);
      
    } catch (error) {
      // GESTION DES ERREURS
      console.error('❌ Erreur chat:', error);
      setHasError(true);
      
      // Déterminer le type d'erreur et afficher le bon message
      let errorMessage = errorMessages.default;
      if (error.message?.includes('API') || error.message?.includes('clé')) {
        errorMessage = errorMessages.apiError;
      } else if (error.message?.includes('fetch') || error.message?.includes('network')) {
        errorMessage = errorMessages.networkError;
      }

      // Ajouter le message d'erreur
      setMessages(prev => [...prev, { 
        role: 'bot', 
        message: errorMessage, 
        timestamp: Date.now(),
        isError: true  // Permet de styliser différemment
      }]);
      
    } finally {
      // finally = exécuté dans tous les cas (succès ou erreur)
      setIsLoading(false); // Désactiver le chargement
    }
  };

  /**
   * 📝 Gère la soumission du formulaire
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    handleSendMessage();
  };

  /**
   * ⌨️ Gère l'appui sur Entrée dans le textarea
   * Entrée seule = envoyer le message
   * Shift+Entrée = nouvelle ligne
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Empêche le saut de ligne
      handleSubmit(e);
    }
  };

  /**
   * 💡 Gère le clic sur une question suggérée
   */
  const handleSuggestedQuestion = (question) => {
    handleSendMessage(question);
  };

  /**
   * 🔄 Réinitialise la conversation
   */
  const handleReset = () => {
    setMessages([]);
    setHasError(false);
    // Ajouter un nouveau message de bienvenue
    const randomWelcome = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
    setMessages([{ role: 'bot', message: randomWelcome, timestamp: Date.now() }]);
  };

  // ========================================
  // RENDU JSX (Interface visuelle)
  // ========================================
  
  /**
   * JSX = syntaxe qui ressemble à HTML mais c'est du JavaScript
   * return = ce qui sera affiché à l'écran
   */
  
  return (
    <>
      {/* ========================================
          BOUTON FLOTTANT (en bas à droite)
          ======================================== */}
      
      <motion.button
        onClick={() => setIsOpen(!isOpen)} // Toggle : inverse true/false
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.05 }} // Animation au survol : agrandir de 5%
        whileTap={{ scale: 0.95 }}   // Animation au clic : rétrécir de 5%
        aria-label={isOpen ? 'Fermer le chat' : 'Ouvrir le chat'} // Accessibilité
      >
        {/* AnimatePresence = gère les animations d'entrée/sortie */}
        <AnimatePresence mode="wait">
          {isOpen ? (
            // Icône X quand le chat est ouvert
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}  // État initial
              animate={{ rotate: 0, opacity: 1 }}    // État final
              exit={{ rotate: 90, opacity: 0 }}      // État de sortie
              transition={{ duration: 0.2 }}         // Durée de l'animation
            >
              <X size={24} />
            </motion.div>
          ) : (
            // Icône bulle de message quand le chat est fermé
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageCircle size={24} />
              {/* Point rouge "nouveau message" */}
              <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-3 h-3 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ========================================
          FENÊTRE DE CHAT
          ======================================== */}
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatWindowRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            {/* HEADER */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={20} />
                <div>
                  <h3 className="font-semibold">Assistant IA</h3>
                  <p className="text-xs opacity-90">Propulsé par Gemini</p>
                </div>
              </div>
              <button
                onClick={handleReset}
                className="text-white/80 hover:text-white text-sm transition-colors"
                aria-label="Réinitialiser la conversation"
              >
                Réinitialiser
              </button>
            </div>

            {/* ZONE DES MESSAGES */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
              {messages.map((msg, index) => (
                <motion.div
                  key={`${msg.timestamp}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : msg.isError
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-900 dark:text-red-200'
                        : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {msg.role === 'bot' && !msg.isError && index === messages.length - 1 ? (
                        <TypewriterText text={msg.message} speed={27} />
                      ) : (
                        msg.message
                      )}
                    </p>
                    <span className="text-xs opacity-60 mt-1 block">
                      {new Date(msg.timestamp).toLocaleTimeString('fr-FR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* INDICATEUR DE CHARGEMENT */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white dark:bg-gray-700 rounded-2xl px-4 py-3 shadow-sm flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-blue-600" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">Réflexion en cours...</span>
                  </div>
                </motion.div>
              )}

              {/* QUESTIONS SUGGÉRÉES (uniquement au début) */}
              {messages.length === 1 && !isLoading && (
                <div className="space-y-2 mt-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">Questions suggérées :</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.slice(0, 3).map((question, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestedQuestion(question)}
                        className="text-xs bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full px-3 py-1.5 hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Référence pour auto-scroll */}
              <div ref={messagesEndRef} />
            </div>

            {/* INPUT DE SAISIE */}
            <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Posez votre question..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white text-sm resize-none overflow-y-auto min-h-[40px] max-h-[150px]"
                  disabled={isLoading}
                  rows={1}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                  aria-label="Envoyer le message"
                >
                  <Send size={20} />
                </button>
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1.5 ml-1">💡 Astuce : Shift+Entrée pour une nouvelle ligne</p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;

// ========================================
// RÉSUMÉ DU FLUX COMPLET
// ========================================

/*
1. L'utilisateur clique sur le bouton flottant
   → setIsOpen(true)

2. La fenêtre de chat s'affiche
   → useEffect détecte isOpen=true
   → Ajoute un message de bienvenue

3. L'utilisateur tape une question et appuie sur Entrée
   → handleSubmit() est déclenché
   → handleSendMessage() est appelé

4. handleSendMessage() :
   - Ajoute le message utilisateur à messages[]
   - Appelle sendMessageToGemini() (dans geminiService.js)
   - sendMessageToGemini() envoie la requête à Google
   - Google Gemini génère une réponse
   - La réponse est retournée
   - La réponse est ajoutée à messages[]

5. React détecte que messages[] a changé
   → Re-rend le composant
   → Affiche le nouveau message

6. useEffect détecte messages[] changé
   → Scroll automatique vers le bas

C'est un cycle continu : question → API → réponse → affichage
*/
