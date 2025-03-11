import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `text-white hover:text-gray-300 ${isActive ? "text-gray-400" : ""}`
            }
          >
            Profile
          </NavLink>
        </div>

        <div className="flex space-x-6">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-white hover:text-gray-300 ${isActive ? "text-gray-400" : ""}`
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `text-white hover:text-gray-300 ${isActive ? "text-gray-400" : ""}`
            }
          >
            Product Page
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `text-white hover:text-gray-300 ${isActive ? "text-gray-400" : ""}`
            }
          >
            Contact Us
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `text-white hover:text-gray-300 ${isActive ? "text-gray-400" : ""}`
            }
          >
            Login/SignUp
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;