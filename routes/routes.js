const express = require('express');
const router = express.Router();
const Category = require('../models/categoryModel'); // Update the path if needed
const mongoose = require('mongoose');
const multer = require('multer')
const path =require('path');

// Handle the checkout request
router.post('/checkout', async (req, res) => {
  try {
    const { productIds } = req.body; // Assuming you send an array of product IDs from the frontend

    // Use Mongoose to fetch the products by their IDs
    const products = await Category.find({ _id: { $in: productIds } });

    // Send the products back to the frontend
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});







router.post('/updateCategory', async (req, res) => {
  try {
    console.log(req.body);

    const { withSale, salePercentage } = req.body;

    // Define the update query
    const updateQuery = {
      $set: {
        withSale,
        salePercentage
      },
    };

    // Use the updateMany function to update multiple documents in the collection
    const updateResult = await Category.updateMany({}, updateQuery);

    if (updateResult.ok) {
      res.json({ message: `Updated ${updateResult.nModified} documents.` });
    } else {
      console.error('Error updating documents:', updateResult);
      res.status(500).json({ message: 'Error updating documents' });
    }
  } catch (error) {
    console.error('Error updating documents:', error);
    res.status(500).json({ message: 'Error updating documents' });
  }
});

 const storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,path.join(__dirname,"../images"))
  },
   filename: function(req,file,cb){
    cb(null, file.originalname)
   }
})

const upload = multer({storage})

router.post('/add/image',upload.single("image"),(req,res)=>{
  res.status(200).json({message:"image uploaded"})
})


//category/add
//add product

router.post('/add', upload.single("image"), async (req, res) => {
  try {
    const newCategory = new Category({
      namep: req.body.namep,
      price: req.body.price,
      //image: req.file.buffer,
      withSale: req.body.withSale,
      salePercentage: req.body.salePercentage,
      unit: req.body.unit
    });

    const savedCategory = await newCategory.save();
    console.log('Category saved:', savedCategory);
    res.status(201).json(savedCategory);
  } catch (error) {
    console.error('Error saving category:', error);
    res.status(500).send('Error saving category');
  }
});
//category/id
//get one product
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Category.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//category
//get all product
router.get('/',  async (req, res) => {
  try {

    const allCategories = await Category.find();
    res.json(allCategories);
  } catch (error) {
    console.error('Error getting categories:', error);
    res.status(500).send('Error getting categories');
  }

});

//update prodcut
//category/id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Category.findByIdAndUpdate(id, req.body)
    //we cannot find product 
    if (!product) {
      return res.status(404).json({ message: `cannot find any product with ID ${id}` })
    }
    const updatedProduct = await Category.findById(id);

    res.status(200).json(updatedProduct)

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// DELETE /category/:id
// Delete a product
router.delete('/:id',async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);

    // If no product found with the given ID
    if (!deletedCategory) {
      return res.status(404).json({ message: `Cannot find any product with ID ${id}` });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
