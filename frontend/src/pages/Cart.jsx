import { useCart } from "../context/cartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  
  const increaseQuantity = (id) => {
    setCart(cart.map(item => item._id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  
  const decreaseQuantity = (id) => {
    setCart(cart.map(item => 
      item._id === id && item.quantity > 1 
        ? { ...item, quantity: item.quantity - 1 } 
        : item
    ));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">🛒 Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-lg">Your cart is empty! Start shopping now.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item._id} className="flex items-center justify-between bg-white p-4 shadow-md rounded-lg">
              {/* Product Image & Name */}
              <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-700">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)} each</p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => decreaseQuantity(item._id)}
                  className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400"
                >
                  ➖
                </button>
                <span className="text-lg font-semibold">{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(item._id)}
                  className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400"
                >
                  ➕
                </button>
              </div>

              {/* Price & Remove Button */}
              <div className="flex items-center space-x-6">
                <p className="text-xl font-bold text-blue-600">${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => removeFromCart(item._id)}
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Total Amount & Checkout */}
      {cart.length > 0 && (
        <div className="mt-6 text-right">
          <h3 className="text-xl font-semibold">
            Total: <span className="text-blue-600 ml-2">${totalAmount.toFixed(2)}</span>
          </h3>
          <button
            className="bg-indigo-500 text-white px-6 py-3 mt-4 rounded-lg text-lg font-semibold shadow-md hover:bg-indigo-600"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout ➡️
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
