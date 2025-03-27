const { Router } = require("express");
const userModel = require("../Model/userModel");
const productModel = require("../Model/productModel");
const orderModel = require("../Model/orderModel");
const bcrypt = require("bcrypt");
const { upload } = require("../../multer");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { isAuthenticated } = require("../middleware/auth"); // Import authentication middleware
const cookieParser = require("cookie-parser"); // Required for cookie handling
require("dotenv").config({ path: "./src/config/.env" });

const secret = process.env.private_key;
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
const userrouter = Router();
userrouter.use(cookieParser()); // Use cookie parser middleware

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

// 🟢 Login user (with JWT stored in HTTP-only cookie)
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
      const token = jwt.sign({ email, id: check._id }, secret, { expiresIn: "7d" });

      // Store token inside an HTTP-only cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiry
      });

      res.status(200).json({ message: "Login successful" });
    } else {
      return res.status(400).json({ message: "Invalid password" });
    }
  });
});

// 🟢 Protected Route - Fetch user profile (Requires authentication)
userrouter.get("/profile", isAuthenticated, async (req, res) => {
  const user = await userModel.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ user });
});

// 🟢 Logout Route - Clears the authentication cookie
userrouter.get("/logout", (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0), // Expire immediately
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// 🟢 Update user address
userrouter.post("/update-address", isAuthenticated, async (req, res) => {
  const { address } = req.body;
  try {
    const user = await userModel.findByIdAndUpdate(
      req.user.id,
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

// 🟢 Get user addresses (Requires authentication)
userrouter.get("/get-addresses", isAuthenticated, async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user || !user.addresses.length) {
      return res.status(404).json({ message: "No addresses found" });
    }
    res.status(200).json({ addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ message: "Error fetching addresses" });
  }
});

// 🟢 Place Order (Requires authentication)
userrouter.post("/place-order", isAuthenticated, async (req, res) => {
  const { products, address } = req.body;
  try {
    const orders = [];
    for (const product of products) {
      const productDetails = await productModel.findById(product.productId);
      if (!productDetails) {
        return res.status(400).json({ message: `Product with ID ${product.productId} not found` });
      }

      const order = new orderModel({
        userId: req.user.id,
        productId: product.productId,
        quantity: product.quantity,
        address: address,
        status: "Pending",
        paypalOrderId: "",
        createdAt: new Date(),
      });
      orders.push(order);
    }

    await orderModel.insertMany(orders);
    res.status(201).json({ message: "Order placed successfully", orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error placing order" });
  }
});

// 🟢 Get all orders for a user (Requires authentication)
userrouter.get("/your-orders", isAuthenticated, async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.user.id }).populate("productId");
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

// 🟢 Cancel Order (Requires authentication)
userrouter.post("/cancel-order", isAuthenticated, async (req, res) => {
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