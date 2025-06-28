import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section>
          <Outlet />
        </section>
      </main>
    </>
  );
};

export default Layout;
