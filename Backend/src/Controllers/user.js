const { Router } = require("express");
const nodemailer = require("nodemailer");
const userModel = require("../Model/userModel");
const { upload } = require("../../multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userrouter = Router();
require("dotenv").config({ path: "./src/config/.env" });
const path = require("path");

const secret = process.env.private_key;

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "your-email@gmail.com",
        pass: "your-email-password"
    }
});

userrouter.post("/create-user", upload.single("file"), async (req, res) => {
    const { name, email, password } = req.body;
    const userEmail = await userModel.findOne({ email });
    if (userEmail) {
        return res.status(400).json({ message: "User already exists" });
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    bcrypt.hash(password, 10, async function (err, hash) {
        await userModel.create({
            name: name,
            email: email,
            password: hash,
        });
    });
});

userrouter.get("/profile", async (req, res) => {
    const { email } = req.query;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const user = await userModel.findOne({ email: email });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user: user });
});

userrouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const check = await userModel.findOne({ email: email });
    if (!check) {
        return res.status(400).json({ message: "User not found" });
    }

    bcrypt.compare(password, check.password, function (err, result) {
        if (err) {
            return res.status(400).json({ message: "Invalid bcrypt compare" });
        }
        if (result) {
            jwt.sign({ email: email }, secret, (err, token) => {
                if (err) {
                    return res.status(400).json({ message: "Invalid jwt" });
                }
                res.status(200).json({ token: token });
            });
        } else {
            return res.status(400).json({ message: "Invalid password" });
        }
    });
});

// Endpoint to send user data via email
userrouter.get("/send-user-data", async (req, res) => {
    try {
        const users = await userModel.find();
        if (!users.length) return res.status(404).json({ message: "No users found" });

        let emailContent = "<h1>User Data</h1><ul>";
        users.forEach(user => {
            emailContent += `<li><strong>Name:</strong> ${user.name} <br> <strong>Email:</strong> ${user.email} <br> <strong>Address:</strong> ${user.address || "N/A"}</li>`;
        });
        emailContent += "</ul>";

        await transporter.sendMail({
            from: "your-email@gmail.com",
            to: "recipient@example.com",
            subject: "User Data Report",
            html: emailContent
        });

        res.json({ message: "Email sent successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Error sending email", error });
    }
});

module.exports = userrouter;