

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// API Endpoint for Checkout
app.post("/api/checkout", (req, res) => {
    const { order_id, amount } = req.body;

    // Validate Request
    if (!order_id || !amount) {
        return res.status(400).json({ message: "Order ID and Amount are required!" });
    }

    // Simulate Checkout Response
    res.status(200).json({
        order_id,
        amount,
        message: "Checkout successful!",
    });
});

// Serve Frontend Files
app.use(express.static("public"));

// Start Server
app.listen(port, () => {
    console.log(Server is running on http://localhost:${port});
});
