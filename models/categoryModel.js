const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  namep: String,
  price: Number,
  image: Buffer,
  withSale: Boolean,
  salePercentage: Number,
  unit: String,
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
