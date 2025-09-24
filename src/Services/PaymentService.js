import * as PaymentRepository from '../Repositories/PaymentRepository.js';

export const addPayment = async (paymentData) =>
{
  return await PaymentRepository.createPayment(paymentData);
};

export const updatePayment = async (paymentId, updates) =>
{
  return await PaymentRepository.findPaymentByIdAndUpdate(paymentId, updates);
};

export const deletePayment = async (paymentId) =>
{
  return await PaymentRepository.findPaymentByIdAndDelete(paymentId);
};

export const getPayments = async () =>
{
  return await PaymentRepository.findAllPayments();
};

export const getPaymentsByUser = async (userId) =>
{
  return await PaymentRepository.findPaymentsByUserId(userId);
};
