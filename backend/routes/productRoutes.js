import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// Get Products with Pagination, Sorting, and Filtering
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 8 } = req.query;
    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(Number(limit)); // Convert limit to number to avoid errors
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
