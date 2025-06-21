// server.js
import express, { json } from 'express';
import Razorpay from 'razorpay';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(json());

// Initialize Razorpay instance
const instance = new Razorpay({
  key_id: 'rzp_test_L26VIOCFHsgOjT', // 🔁 Your Razorpay Test Key ID
  key_secret: 'YOUR_SECRET_KEY_HERE' // 🔁 Your Razorpay Secret
});

app.post('/create-order', async (req, res) => {
  const { amount } = req.body;

  try {
    const options = {
      amount: amount * 100, // Amount in paise
      currency: 'INR',
      receipt: 'receipt_order_' + Math.random().toString(36).substring(7),
    };

    const order = await instance.orders.create(options);
    console.log('Order created:', order);
    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send('Order creation failed');
  }
});

app.listen(5000, () => {
  console.log('Server started on http://localhost:5000');
});
