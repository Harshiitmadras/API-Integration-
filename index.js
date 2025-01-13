const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post("/api/checkout", (req, res) => {
    const { order_id, amount } = req.body;

    if (!order_id || !amount) {
        return res.status(400).json({ message: "Order ID and Amount are required!" });
    }

    res.status(200).json({
        order_id,
        amount,
        message: "Checkout successful!",
    });
});

app.use(express.static("public"));

app.listen(port, () => {
    console.log(Server is running on http://localhost:${port});
});
