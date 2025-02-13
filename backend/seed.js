import mongoose from "mongoose";
import axios from "axios";
import Product from "./models/Product.js"; // Import your product model
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/inventory";

// **Connect to MongoDB**
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("🔥 Connected to MongoDB"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// **Function to Fetch & Insert Products**
const seedProducts = async () => {
  try {
    console.log("⏳ Fetching products...");
    
    // Fetching 50 products from DummyJSON API
    const response = await axios.get("https://dummyjson.com/products?limit=50");
    const products = response.data.products.map((item) => ({
      name: item.title,
      description: item.description,
      price: item.price,
      image: item.thumbnail, // Using the first image as product image
      category: item.category,
      stock: Math.floor(Math.random() * 100) + 1, // Random stock quantity
      discount: Math.floor(Math.random() * 20) + 5, // Random discount 5-25%
    }));

    // **Clear old products and insert new ones**
    await Product.deleteMany({});
    await Product.insertMany(products);

    console.log("✅ Successfully seeded 50 products!");
    mongoose.connection.close(); // Close DB connection
  } catch (error) {
    console.error("❌ Seeding Error:", error);
    mongoose.connection.close();
  }
};

// **Run the function**
seedProducts();
