import { useCart } from "../context/cartContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingCart } from "lucide-react";

const ProductList = () => {
  const { addToCart, cart } = useCart(); // Get cart state from context
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [clickedButton, setClickedButton] = useState(null); // Track clicked button
  const API_URL = "https://backend-2c1rzngeo-anil29717s-projects.vercel.app";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/products?page=${page}&limit=8`);
        setProducts((prev) => [...prev, ...response.data]); // Append new products
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  const calculateDiscountedPrice = (price, discount) => {
    return (price * (100 - discount) / 100).toFixed(2);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setClickedButton(product._id); // Track which button was clicked
    setTimeout(() => setClickedButton(null), 300); // Reset after effect
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Our Products</h1>
        
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:scale-105 hover:shadow-lg">
            {/* Product Image */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              {product.discount > 0 && (
                <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                  -{product.discount}%
                </span>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2 h-14 line-clamp-2">
                {product.name}
              </h2>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-bold text-green-600">
                  ${calculateDiscountedPrice(product.price, product.discount)}
                </span>
                {product.discount > 0 && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Add to Cart Button with Click Effect */}
              <button
                onClick={() => handleAddToCart(product)}
                className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md transition-all duration-300 ${
                  clickedButton === product._id ? "scale-110 bg-blue-700" : "hover:bg-blue-700"
                }`}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => setPage(page + 1)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all"
          disabled={loading}
        >
          {loading ? "Loading..." : "Load More Products"}
        </button>
      </div>
    </div>
  );
};

export default ProductList;
