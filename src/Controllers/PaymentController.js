import Payment from '../Models/PaymentModel.js';

// Add payment
export const addPayment = async (req, res) => {
  try {
    const { userId, fname, lname, flatFee, paybackFee } = req.body;

    const payment = new Payment({
      userId,
      fname,
      lname,
      flatFee,
      paybackFee,
    });

    payment.calculateTotalBill(); // Calculate total bill

    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update payment
export const updatePayment = async (req, res) => {
  const { id } = req.params;
  try {
    const payment = await Payment.findByIdAndUpdate(id, req.body, { new: true });
    if (!payment) throw Error('Payment not found');
    payment.calculateTotalBill();
    await payment.save();
    res.status(200).json(payment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete payment
export const deletePayment = async (req, res) => {
  const { id } = req.params;
  try {
    const payment = await Payment.findByIdAndDelete(id);
    if (!payment) throw Error('Payment not found');
    res.status(200).json({ message: 'Payment deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get payments
export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getPaymentuser = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.query.userId });
    if (!payments || payments.length === 0) {
      throw new Error('Error retrieving user payments');
    }
    res.status(200).json(payments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};