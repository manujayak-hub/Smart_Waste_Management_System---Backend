import * as PaymentService from '../Services/PaymentService.js';
import xss from 'xss';

export const addPayment = async (req, res) =>
{
  try
  {
    const { userId, fname, lname, flatFee, paybackFee } = req.body;

    // sanitize inputs
    const paymentData = {
      userId: xss(userId),
      fname: xss(fname),
      lname: xss(lname),
      flatFee: Number(flatFee),
      paybackFee: Number(paybackFee)
    };

    // calculate totalBill
    paymentData.totalBill = paymentData.flatFee * 30;

    const payment = await PaymentService.addPayment(paymentData);
    res.status(201).json(payment);
  } catch (error)
  {
    res.status(400).json({ error: xss(error.message) });
  }
};

export const updatePayment = async (req, res) =>
{
  try
  {
    const paymentId = req.params.id;
    const updates = {
      fname: req.body.fname ? xss(req.body.fname) : undefined,
      lname: req.body.lname ? xss(req.body.lname) : undefined,
      flatFee: req.body.flatFee ? Number(req.body.flatFee) : undefined,
      paybackFee: req.body.paybackFee ? Number(req.body.paybackFee) : undefined,
      status: req.body.status ? xss(req.body.status) : undefined
    };

    const updatedPayment = await PaymentService.updatePayment(paymentId, updates);
    if (!updatedPayment) return res.status(404).json({ error: 'Payment not found' });
    res.status(200).json(updatedPayment);
  } catch (error)
  {
    res.status(500).json({ error: xss(error.message) });
  }
};

export const deletePayment = async (req, res) =>
{
  try
  {
    const paymentId = req.params.id;
    const deletedPayment = await PaymentService.deletePayment(paymentId);

    if (!deletedPayment) return res.status(400).json({ error: 'Payment not found' });

    res.status(200).json({ message: 'Payment deleted' });
  } catch (error)
  {
    res.status(400).json({ error: xss(error.message) });
  }
};

export const getPayments = async (req, res) =>
{
  try
  {
    const payments = await PaymentService.getPayments();
    // sanitize output
    const sanitizedPayments = payments.map(p => ({
      ...p._doc,
      fname: xss(p.fname),
      lname: xss(p.lname),
      status: xss(p.status)
    }));
    res.status(200).json(sanitizedPayments);
  } catch (error)
  {
    res.status(400).json({ error: xss(error.message) });
  }
};

export const getPaymentuser = async (req, res) =>
{
  try
  {
    const payments = await PaymentService.getPaymentsByUser(xss(req.query.userId));
    if (!payments || payments.length === 0)
    {
      throw new Error('Error retrieving user payments');
    }

    const sanitizedPayments = payments.map(p => ({
      ...p._doc,
      fname: xss(p.fname),
      lname: xss(p.lname),
      status: xss(p.status)
    }));

    res.status(200).json(sanitizedPayments);
  } catch (error)
  {
    res.status(400).json({ error: xss(error.message) });
  }
};
