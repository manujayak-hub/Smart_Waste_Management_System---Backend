// Repositories/PaymentRepository.js
import Payment from '../Models/PaymentModel.js';

export const createPayment = async (paymentData) => {
  const payment = new Payment(paymentData);
  payment.calculateTotalBill();
  return await payment.save();
};

export const findPaymentByIdAndUpdate = async (paymentId, updates) => {
  return await Payment.findByIdAndUpdate(paymentId, updates, { new: true });
};

export const findPaymentByIdAndDelete = async (paymentId) => {
  return await Payment.findByIdAndDelete(paymentId);
};

export const findAllPayments = async () => {
  return await Payment.find();
};

export const findPaymentsByUserId = async (userId) => {
  return await Payment.find({ userId });
};
