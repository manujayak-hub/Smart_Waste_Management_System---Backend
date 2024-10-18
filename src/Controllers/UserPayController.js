// src/Controllers/UserPayController.js
import Stripe from 'stripe';
import UserPayment from '../Models/UserPayementModel.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  const { items, userId } = req.body; // Receive userId and items from the request

  try {
    // Create a Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: { name: item.name },
          unit_amount: item.price * 100, // Convert to cents
        },
        quantity: 1,
      })),
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
    });

    const formattedDate = new Date().toISOString().split('T')[0].replace(/-/g, '/');

    // Save the session details in MongoDB
    const paymentData = new UserPayment({
      userId, // Set userId from the request
      items,
      totalAmount: items.reduce((total, item) => total + item.price, 0),
      sessionId: session.id,
      paymentStatus: 'Completed', 
      createdAt: formattedDate
    });

    await paymentData.save(); // Save payment details to the database

    // Respond with the session URL for checkout
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPayments = async (req, res) => {
  try {
    const payments = await UserPayment.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
