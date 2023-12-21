const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
    enum: ["Electronics", "Clothing", "Books", "Home", "Other"],
  },
  brand: String,
  featured: {
    type: Boolean,
    default: false
  },
  createdAt : {
    type : Date , 
    default : Date.now()
  }
});

module.exports = mongoose.model("products" , ProductSchema);
