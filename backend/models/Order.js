import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerName: String,
  address: String,
  paymentMethod: String,
  totalAmount: Number,
  items: [
    {
      productId: mongoose.Schema.Types.ObjectId,
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", orderSchema);
