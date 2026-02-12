const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// @route GET /api/users
// @desc Get all users
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route GET /api/users/stats
// @desc Get dashboard statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    
    // Calculate total ration issued
    const users = await User.find();
    const totalRationIssued = users.reduce((total, user) => {
      return total + user.issuedRation.rice + user.issuedRation.wheat + user.issuedRation.sugar;
    }, 0);

    res.json({
      totalUsers,
      totalRationIssued
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route POST /api/users
// @desc Add new user
router.post('/', auth, async (req, res) => {
  try {
    const { name, email, phone, address, rationCardNumber, familyMembers } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { rationCardNumber }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email or ration card number already exists' });
    }

    // Calculate ration quota based on family members
    const rationQuota = {
      rice: familyMembers * 5, // 5kg per member
      wheat: familyMembers * 3, // 3kg per member
      sugar: familyMembers * 1  // 1kg per member
    };

    const newUser = new User({
      name,
      email,
      phone,
      address,
      rationCardNumber,
      familyMembers,
      rationQuota
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route PUT /api/users/:id
// @desc Update user
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, email, phone, address, familyMembers, issuedRation } = req.body;
    
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.familyMembers = familyMembers || user.familyMembers;
    
    // Update ration quota if family members changed
    if (familyMembers) {
      user.rationQuota = {
        rice: familyMembers * 5,
        wheat: familyMembers * 3,
        sugar: familyMembers * 1
      };
    }

    // Update issued ration if provided
    if (issuedRation) {
      user.issuedRation = issuedRation;
    }

    await user.save();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route DELETE /api/users/:id
// @desc Delete user
router.delete('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;