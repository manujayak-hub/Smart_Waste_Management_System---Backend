import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Pending',
  },
  paybackFee: {
    type: Number,
    required: true,
  },
  flatFee: {
    type: Number,
    required: true,
  },
  totalBill: {
    type: Number,
    required: true,
  },
});

paymentSchema.methods.calculateTotalBill = function () {
  this.totalBill = this.flatFee * 30;
};

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
