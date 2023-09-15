const express = require('express');
const ShippingPrice = require('../models/shippingPriceModel');
const router = express.Router();


// Define a route to get the shipping price
router.post('/shipping-price', async(req, res) => {
  try {
    const { destination, weight, shippingMethod, price } = req.body;

    // Create a new shipping price document
    const newShippingPrice = new ShippingPrice({
      destination,
      weight,
      shippingMethod,
      price,
    });
     // Save the new shipping price document to the database
     const savedShippingPrice = await newShippingPrice.save();

     console.log('Shipping price saved:', savedShippingPrice);
     res.status(201).json(savedShippingPrice);
   } catch (error) {
     console.error('Error saving shipping price:', error);
     res.status(500).send('Error saving shipping price');
   }
});

module.exports = router;
