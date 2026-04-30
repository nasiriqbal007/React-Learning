import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky bg-blue-600 text-white px-10 py-5">
      <div className="flex flex-row gap-10">
        <Link to="/" className="hover:text-blue-200">
          Home
        </Link>
        <Link to="/about" className="hover:text-blue-200">
          About
        </Link>
        <Link to="/contact" className="hover:text-blue-200">
          Contact
        </Link>
      </div>
    </nav>
  );
}
export default Navbar;
