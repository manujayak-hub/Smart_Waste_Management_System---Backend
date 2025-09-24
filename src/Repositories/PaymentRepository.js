import Payment from '../Models/PaymentModel.js';
import xss from 'xss';

export const createPayment = async (paymentData) =>
{
  const payment = new Payment(paymentData);
  return await payment.save(); // totalBill is handled by pre-save hook
};

export const findPaymentByIdAndUpdate = async (paymentId, updates) =>
{
  return await Payment.findByIdAndUpdate(paymentId, updates, { new: true });
};

export const findPaymentByIdAndDelete = async (paymentId) =>
{
  return await Payment.findByIdAndDelete(paymentId);
};

export const findAllPayments = async () =>
{
  return await Payment.find();
};

export const findPaymentsByUserId = async (userId) =>
{
  return await Payment.find({ userId: xss(userId) });
};
