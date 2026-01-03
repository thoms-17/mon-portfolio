import Navbar from "../components/Navbar";
import ScrollToTopButton from "../components/ScrollToTopButton";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <ScrollToTopButton />
      <main>
        <section>{children}</section>
      </main>
    </>
  );
};

export default Layout;
