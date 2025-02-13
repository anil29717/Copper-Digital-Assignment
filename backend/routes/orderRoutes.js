import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// Create a new order
router.post("/", async (req, res) => {
  try {
    const { customerName, address, paymentMethod, items, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const newOrder = new Order({ customerName, address, paymentMethod, totalAmount, items });
    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Error placing order", error });
  }
});

export default router;
