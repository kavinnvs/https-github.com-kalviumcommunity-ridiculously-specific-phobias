const { Router } = require("express");
const userModel = require("../Model/userModel");
const productModel = require("../Model/productModel");
const orderModel = require("../Model/orderModel"); // Fixed case sensitivity
const bcrypt = require("bcrypt");
const { upload } = require("../../multer");
const jwt = require("jsonwebtoken");
const axios = require("axios"); // For calling PayPal API
require("dotenv").config({ path: "./src/config/.env" });

const secret = process.env.private_key;
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
const userrouter = Router();

// 🟢 Create a new user
userrouter.post("/create-user", upload.single("file"), async (req, res) => {
  const { name, email, password } = req.body;
  const userEmail = await userModel.findOne({ email });

  if (userEmail) {
    return res.status(400).json({ message: "User already exists" });
  }

  bcrypt.hash(password, 10, async function (err, hash) {
    await userModel.create({
      name,
      email,
      password: hash,
    });
    res.status(201).json({ message: "User created successfully" });
  });
});

// 🟢 Login user
userrouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const check = await userModel.findOne({ email });

  if (!check) {
    return res.status(400).json({ message: "User not found" });
  }

  bcrypt.compare(password, check.password, function (err, result) {
    if (err) {
      return res.status(400).json({ message: "Invalid bcrypt compare" });
    }
    if (result) {
      jwt.sign({ email }, secret, (err, token) => {
        if (err) {
          return res.status(400).json({ message: "Invalid jwt" });
        }
        res.status(200).json({ token });
      });
    } else {
      return res.status(400).json({ message: "Invalid password" });
    }
  });
});

// 🟢 Fetch user profile
userrouter.get("/profile", async (req, res) => {
  const { email } = req.query;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 🟢 Update user address
userrouter.post("/update-address", async (req, res) => {
  const { email, address } = req.body;
  try {
    const user = await userModel.findOneAndUpdate(
      { email },
      { $push: { addresses: address } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Address updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating address" });
  }
});

// 🟢 Get user addresses
userrouter.get("/get-addresses", async (req, res) => {
  const { email } = req.query;
  try {
    const user = await userModel.findOne({ email });
    if (!user || !user.addresses.length) {
      return res.status(404).json({ message: "No addresses found" });
    }
    res.status(200).json({ addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ message: "Error fetching addresses" });
  }
});

// 🟢 Place Order
userrouter.post("/place-order", async (req, res) => {
  const { email, products, address } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const orders = [];
    for (const product of products) {
      const productDetails = await productModel.findById(product.productId);
      if (!productDetails) {
        return res.status(400).json({ message: `Product with ID ${product.productId} not found` });
      }

      const order = new orderModel({
        userId: user._id,
        productId: product.productId,
        quantity: product.quantity,
        address: address,
        status: "Pending",
        paypalOrderId: "", // Store PayPal order ID later
        createdAt: new Date(),
      });
      
    }

    await orderModel.insertMany(orders);
    res.status(201).json({ message: "Order placed successfully", orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error placing order" });
  }
});

// 🟢 PayPal Payment Verification
userrouter.post("/verify-paypal-payment", async (req, res) => {
  const { orderId } = req.body;

  try {
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString("base64");
    const response = await axios.post(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`,
      {},
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.status === "COMPLETED") {
      const order = await orderModel.findByIdAndUpdate(orderId, { status: "Paid" }, { new: true });
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      return res.status(200).json({ message: "Payment successful", order });
    } else {
      return res.status(400).json({ message: "Payment not completed" });
    }
  } catch (error) {
    console.error("PayPal Payment Verification Error:", error);
    return res.status(500).json({ message: "Error verifying payment" });
  }
});

// 🟢 Get all orders for a user
userrouter.get("/your-orders", async (req, res) => {
  const { email } = req.query;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const orders = await orderModel.find({ userId: user._id }).populate("productId");
    const filteredOrders = orders.filter(order => order.productId !== null);

    if (!filteredOrders.length) {
      return res.status(404).json({ message: "No valid orders found" });
    }

    res.status(200).json({ orders: filteredOrders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders" });
  }
});

// 🟢 Cancel Order
userrouter.post("/cancel-order", async (req, res) => {
  const { orderId } = req.body;

  try {
    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    if (order.status === "Canceled") {
      return res.status(400).json({ message: "Order is already canceled" });
    }

    order.status = "Canceled";
    await order.save();

    res.status(200).json({ message: "Order canceled successfully", order });
  } catch (error) {
    console.error("Error canceling order:", error);
    res.status(500).json({ message: "Error canceling order" });
  }
});

module.exports = userrouter;