import express from 'express';
import { addPayment, updatePayment, deletePayment, getPayments, getPaymentuser } from '../Controllers/PaymentController.js';
import requireAuth from '../Middleware/UserAuth.js'

const router = express.Router();

router.post('/add', addPayment);
router.put('/update/:id', updatePayment);
router.delete('/delete/:id', deletePayment);
router.get('/get', getPayments);
router.get('/getuserpay', requireAuth, getPaymentuser);

export default router;
