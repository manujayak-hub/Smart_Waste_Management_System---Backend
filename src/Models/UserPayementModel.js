import mongoose from 'mongoose';

const UserPaymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'Completed', 'failed'],
    default: 'Completed'
  },
  sessionId: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  }
});

const UserPayment = mongoose.model('UserPayment', UserPaymentSchema);
export default UserPayment;
