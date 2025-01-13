const express = require('express');
const axios = require('axios');
const crypto = require('crypto');

const app = express();
app.use(express.json());

const API_KEY = 'Cc@merabestie.com'; // Provided email
const API_SECRET = 'Shekhawati@1'; // Provided password
const CHECKOUT_API_URL = 'https://checkout-api.shiprocket.com/api/v1/access-token/checkout';
const ORDER_DETAILS_API_URL = 'https://checkout-api.shiprocket.com/api/v1/custom-platform-order/details';

// Route: Generate Access Token
app.post('/generate-token', async (req, res) => {
    const cartData = {
        cart_data: {
            items: [{ variant_id: "1244539923890450", quantity: 1 }]
        },
        redirect_url: "https://your-domain.requestcatcher.com/?anyparam=anyvalue&more=2",
        timestamp: new Date().toISOString()
    };

    const hmac = crypto.createHmac('sha256', API_SECRET)
        .update(JSON.stringify(cartData))
        .digest('base64');

    try {
        const response = await axios.post(CHECKOUT_API_URL, cartData, {
            headers: {
                'X-Api-Key': API_KEY,
                'X-Api-HMAC-SHA256': hmac,
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data); // Send token as a response
    } catch (error) {
        console.error('Error generating token:', error.response?.data || error.message);
        res.status(500).send('Error generating token');
    }
});

// Route: Fetch Order Details
app.post('/order-details', async (req, res) => {
    const { order_id } = req.body;

    const body = {
        order_id: order_id,
        timestamp: new Date().toISOString()
    };

    const hmac = crypto.createHmac('sha256', API_SECRET)
        .update(JSON.stringify(body))
        .digest('base64');

    try {
        const response = await axios.post(ORDER_DETAILS_API_URL, body, {
            headers: {
                'X-Api-Key': API_KEY,
                'X-Api-HMAC-SHA256': hmac,
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching order details:', error.response?.data || error.message);
        res.status(500).send('Error fetching order details');
    }
});

// Start the Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
