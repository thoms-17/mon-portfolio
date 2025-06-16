import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16 px-4 max-w-5xl mx-auto">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
