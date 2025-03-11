const express = require('express');
const router = express.Router();
const Order = require('../model/order');
const User = require('../model/user'); 

router.post('/create-order', async (req, res) => {
    try {
        const { email, products, address } = req.body;
  
        if (!email || !products || !address || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: 'Invalid input' });
        }
  
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
  
        const userId = user._id;
  
        const orders = products.map(product => ({
            userId,
            productId: product.productId,
            quantity: product.quantity,
            address,
            status: 'Pending',
            createdAt: new Date(),
        }));
  
        const createdOrders = await Order.insertMany(orders);
  
        res.status(201).json({ message: 'Orders placed successfully', orders: createdOrders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
  });

router.post('/get-orders', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userId = user._id;

        const orders = await Order.find({ userId });

        res.status(200).json({ message: 'Orders retrieved successfully', orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;