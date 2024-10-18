// Controllers/PaymentController.js
import * as PaymentService from '../Services/PaymentService.js';

export const addPayment = async (req, res) => {
  try {
    const { userId, fname, lname, flatFee, paybackFee } = req.body;
    const paymentData = { userId, fname, lname, flatFee, paybackFee };
    const payment = await PaymentService.addPayment(paymentData);
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updatePayment = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const updates = req.body;
    const updatedPayment = await PaymentService.updatePayment(paymentId, updates);
    if (!updatedPayment) return res.status(404).json({ error: 'Payment not found' });
    res.status(200).json(updatedPayment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePayment = async (req, res) => {
  try {
    const paymentId = req.params.id;
    const deletedPayment = await PaymentService.deletePayment(paymentId);

    if (!deletedPayment) {
      return res.status(400).json({ error: 'Payment not found' });
    }

    res.status(200).json({ message: 'Payment deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getPayments = async (req, res) => {
  try {
    const payments = await PaymentService.getPayments();
    res.status(200).json(payments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getPaymentuser = async (req, res) => {
  try {
    const payments = await PaymentService.getPaymentsByUser(req.query.userId);
    if (!payments || payments.length === 0) {
      throw new Error('Error retrieving user payments');
    }
    res.status(200).json(payments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
