const mongoose = require('mongoose');

const shippingPriceSchema = new mongoose.Schema({
  destination: String,
  weight: Number,
  shippingMethod: String,
  price: Number,
});

const ShippingPrice = mongoose.model('ShippingPrice', shippingPriceSchema);

module.exports = ShippingPrice;
