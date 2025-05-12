const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  description: String,
  ratings: Number,
  images: [
    {
      Image: String,
    },
  ],
  category: String,
  seller: String,
  stock: Number,
  numOfReviews: Number,
  createdAt: Date,
});

const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;
