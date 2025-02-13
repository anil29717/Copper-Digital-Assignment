import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  stock: Number,
  discount: Number,
});

const Product = mongoose.model("Product", productSchema);
export default Product;
