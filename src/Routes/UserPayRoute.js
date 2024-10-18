// src/Routes/PaymentRoute.js

import express from "express";
import { createCheckoutSession, getPayments } from "../Controllers/UserPayController.js";

const router = express.Router();

router.post("/checkout", createCheckoutSession);
router.get('/get', getPayments);

export default router;
