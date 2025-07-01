import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import ScrollToTopButton from "../components/ScrollToTopButton";

const Layout = () => {
  return (
    <>
      <Navbar />
      <ScrollToTopButton />
      <main>
        <section>
          <Outlet />
        </section>
      </main>
    </>
  );
};

export default Layout;
