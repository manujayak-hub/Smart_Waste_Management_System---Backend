import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  paybackFee: { type: Number, required: true },
  flatFee: { type: Number, required: true },
  totalBill: { type: Number, required: true },
});

// Pre-save to calculate totalBill
paymentSchema.pre('save', function (next)
{
  this.totalBill = this.flatFee * 30;
  next();
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
