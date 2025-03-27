import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-lg font-bold">
          MyShop
        </Link>
        <div className="space-x-4">
          <Link to="/products" className="hover:underline">
            Products
          </Link>
          <Link to="/my-orders" className="hover:underline">
            My Orders
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;