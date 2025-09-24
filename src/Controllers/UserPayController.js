import Stripe from 'stripe';
import UserPayment from '../Models/UserPayementModel.js';
import xss from 'xss';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) =>
{
  let { items, userId } = req.body;

  try
  {
    // sanitize inputs
    userId = xss(userId);
    items = items.map(item => ({
      name: xss(item.name),
      price: Number(item.price)
    }));

    // Create a Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: { name: item.name },
          unit_amount: item.price * 100,
        },
        quantity: 1,
      })),
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
    });

    const formattedDate = new Date().toISOString().split('T')[0].replace(/-/g, '/');

    // Save the session details in MongoDB
    const paymentData = new UserPayment({
      userId,
      items,
      totalAmount: items.reduce((total, item) => total + item.price, 0),
      sessionId: session.id,
      paymentStatus: 'Completed',
      createdAt: formattedDate
    });

    await paymentData.save();

    // Respond with sanitized session URL
    res.json({ url: xss(session.url) });
  } catch (error)
  {
    res.status(500).json({ error: xss(error.message) });
  }
};

export const getPayments = async (req, res) =>
{
  try
  {
    const payments = await UserPayment.find();

    // sanitize output
    const sanitizedPayments = payments.map(p => ({
      ...p._doc,
      userId: xss(p.userId.toString()),
      items: p.items.map(i => ({
        name: xss(i.name),
        price: i.price
      })),
      paymentStatus: xss(p.paymentStatus),
      sessionId: xss(p.sessionId),
      createdAt: xss(p.createdAt)
    }));

    res.status(200).json(sanitizedPayments);
  } catch (error)
  {
    res.status(400).json({ error: xss(error.message) });
  }
};
