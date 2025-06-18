import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          Mon Portfolio
        </Link>
        <div className="space-x-4 text-sm font-medium">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition">Accueil</Link>

          {/* À venir : <Link to="/projets" ... /> etc. */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
