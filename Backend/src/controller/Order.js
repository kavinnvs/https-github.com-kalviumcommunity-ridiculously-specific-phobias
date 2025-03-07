import Order from "../model/Ordermodel.js";

export const placeOrder = async (req, res) => {
    try {
        const { userId, products, address, totalAmount } = req.body;

        if (!userId || !products || !address || !totalAmount) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newOrder = new Order({ userId, products, address, totalAmount });
        await newOrder.save();

        res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
