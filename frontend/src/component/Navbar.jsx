import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { useState } from "react";
import { ShoppingCart } from "lucide-react"; // Importing an icon for better UI

const Navbar = ({ onSearch }) => {
  const { cart } = useCart(); // Get cart state
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value); // Pass the search query to parent component
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold tracking-wide hover:text-gray-300 transition-all">
        Copper Digital
      </Link>

      {/* Search Bar */}
      <div className="relative w-1/3">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search products..."
          className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Cart Icon */}
      <Link to="/cart" className="relative flex items-center gap-2 hover:text-gray-300 transition-all">
        <ShoppingCart className="w-6 h-6" />
        <span className="font-semibold">Cart</span>
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {cart.length}
          </span>
        )}
      </Link>
    </nav>
  );
};

export default Navbar;
