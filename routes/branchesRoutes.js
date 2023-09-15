const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Branches = require('../models/branchesModel'); // Replace with the actual path to your Mongoose model

// Create a new branch
router.post('/branches', async (req, res) => {
  try {
    const branchData = req.body;
    const branch = new Branches(branchData);
    const savedBranch = await branch.save();
    res.json(savedBranch);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all branches
router.get('/branches', async (req, res) => {
  try {
    const branches = await Branches.find();
    res.json(branches);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific branch by ID
router.get('/branches/:id', async (req, res) => {
  try {
    const branch = await Branches.findById(req.params.id);
    if (!branch) {
      return res.status(404).json({ message: 'Branch not found' });
    }
    res.json(branch);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a branch by ID
router.put('/branches/:id', async (req, res) => {
  try {
    const branchData = req.body;
    const updatedBranch = await Branches.findByIdAndUpdate(
      req.params.id,
      branchData,
      { new: true }
    );
    if (!updatedBranch) {
      return res.status(404).json({ message: 'Branch not found' });
    }
    res.json(updatedBranch);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a branch by ID
router.delete('/branches/:id', async (req, res) => {
  try {
    const deletedBranch = await Branches.findByIdAndRemove(req.params.id);
    if (!deletedBranch) {
      return res.status(404).json({ message: 'Branch not found' });
    }
    res.json({ message: 'Branch deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
