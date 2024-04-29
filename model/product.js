const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, min: [0, "wrong price value"] },
  discountPercentage: {
    type: Number,
    min: [0, "wrong minimum discount"],
    max: [50, "wrong maximum discount"],
  },
  rating: {
    type: Number,
    min: [0, "wrong minimum rating"],
    max: [5, "wrong maximum rating"],
  },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: String,
  images: [String],
});

exports.Product = model("Product", productSchema);
