import Navbar from "../components/Navbar";
import ScrollToTopButton from "../components/ScrollToTopButton";
// 🚧 CHATBOT TEMPORAIREMENT DÉSACTIVÉ
// Raison : Clé API Google Gemini détectée comme "leaked" malgré restrictions domaine
// Solution future : Migration vers backend proxy (Vercel/Netlify) pour cacher la clé
// Code conservé dans src/components/ChatWidget.jsx pour référence
// import ChatWidget from "../components/ChatWidget";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <ScrollToTopButton />
      {/* <ChatWidget /> */}
      <main>
        <section>{children}</section>
      </main>
    </>
  );
};

export default Layout;
