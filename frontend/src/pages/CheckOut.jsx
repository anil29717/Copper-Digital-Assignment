import { useState } from "react";
import { useCart } from "../context/cartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, setCart } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD"); // Default: Cash on Delivery
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleOrder = async () => {
    if (!customerName || !address) {
      alert("Please enter all details.");
      return;
    }

    const orderData = {
      customerName,
      address,
      paymentMethod,
      totalAmount,
      items: cart.map(({ _id, name, price, quantity }) => ({
        productId: _id,
        name,
        price,
        quantity
      }))
    };

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/orders", orderData);
      alert("🎉 Order Placed Successfully!");
      setCart([]); // Clear cart
      navigate("/");
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("⚠️ Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Checkout</h2>

        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>

        {/* Address Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Delivery Address</label>
          <textarea
            placeholder="Enter your address"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* Payment Method Selection */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">Payment Method</label>
          <select
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="COD">Cash on Delivery</option>
            <option value="Card">Credit/Debit Card</option>
          </select>
        </div>

        {/* Order Summary */}
        <div className="flex justify-between items-center mt-6 mb-4 border-t pt-4">
          <h3 className="text-lg font-semibold">Total Amount:</h3>
          <span className="text-xl font-bold text-green-600">${totalAmount.toFixed(2)}</span>
        </div>

        {/* Order Button */}
        <button
          className={`w-full py-3 text-white font-bold rounded-lg transition-all ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={handleOrder}
          disabled={loading}
        >
          {loading ? "Processing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
