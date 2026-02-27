import Navbar from "../components/Navbar";
import ScrollToTopButton from "../components/ScrollToTopButton";
import ChatWidget from "../components/ChatWidget";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <ScrollToTopButton />
      <ChatWidget />
      <main>
        <section>{children}</section>
      </main>
    </>
  );
};

export default Layout;
