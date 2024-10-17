import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import Payment from '../Models/PaymentModel.js';
import {
  addPayment,
  updatePayment,
  deletePayment,
  getPayments,
  getPaymentuser,
} from '../Controllers/PaymentController.js';

// Create mock server
const app = express();
app.use(express.json());
app.post('/add', addPayment);
app.put('/update/:id', updatePayment);
app.delete('/delete/:id', deletePayment);
app.get('/get', getPayments);
app.get('/getuserpay', getPaymentuser);

// Mock the Payment model
jest.mock('../Models/PaymentModel.js');

// Test Suite
describe('Payment Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test addPayment
  describe('POST /add', () => {
    it('should add a new payment', async () => {
      const mockPayment = {
        userId: '123', // Added userId field to mockPayment
        fname: 'John',
        lname: 'Doe',
        flatFee: 100,
        paybackFee: 50,
        totalBill: 3000, // This is now handled by the controller
      };
  
      // Mock the Payment model save function
      Payment.mockImplementation(() => ({
        ...mockPayment,
        calculateTotalBill: jest.fn().mockImplementation(function () {
          this.totalBill = this.flatFee * 30; // Set totalBill calculation logic
        }),
        save: jest.fn().mockResolvedValue(mockPayment), // Mock save method
      }));
  
      const res = await request(app).post('/add').send(mockPayment);
  
      expect(res.status).toBe(201);
      expect(res.body.userId).toBe(mockPayment.userId);
      expect(res.body.totalBill).toBe(mockPayment.totalBill);
    });
  });

  // Test updatePayment
  describe('PUT /update/:id', () => {
    it('should update the payment', async () => {
      const mockPayment = {
        _id: '123',
        fname: 'John',
        lname: 'Doe',
        flatFee: 150,
        paybackFee: 50,
        totalBill: 4500,
      };

      Payment.findByIdAndUpdate.mockResolvedValue({
        ...mockPayment,
        calculateTotalBill: jest.fn(),
        save: jest.fn().mockResolvedValue(mockPayment),
      });

      const res = await request(app).put('/update/123').send(mockPayment);

      expect(res.status).toBe(200);
      expect(res.body.flatFee).toBe(150);
      expect(res.body.totalBill).toBe(4500);
    });

    it('should return an error if payment not found', async () => {
      Payment.findByIdAndUpdate.mockResolvedValue(null);

      const res = await request(app).put('/update/invalidId').send({});

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Payment not found');
    });
  });

  // Test deletePayment
  describe('DELETE /delete/:id', () => {
    it('should delete a payment', async () => {
      Payment.findByIdAndDelete.mockResolvedValue({});

      const res = await request(app).delete('/delete/123');

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Payment deleted');
    });

    it('should return an error if payment not found', async () => {
      Payment.findByIdAndDelete.mockResolvedValue(null);

      const res = await request(app).delete('/delete/invalidId');

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Payment not found');
    });
  });

  // Test getPayments
  describe('GET /get', () => {
    it('should return all payments', async () => {
      const mockPayments = [
        { userId: '123', totalBill: 3000 },
        { userId: '124', totalBill: 2000 },
      ];

      Payment.find.mockResolvedValue(mockPayments);

      const res = await request(app).get('/get');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockPayments);
    });

    it('should return an error if no payments found', async () => {
      Payment.find.mockRejectedValue(new Error('Error retrieving payments'));

      const res = await request(app).get('/get');

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Error retrieving payments');
    });
  });

  // Test getPaymentuser
  describe('GET /getuserpay', () => {
    it('should return payments for a specific user', async () => {
      const mockPayments = [{ userId: '123', totalBill: 3000 }];

      Payment.find.mockResolvedValue(mockPayments);

      const res = await request(app).get('/getuserpay').query({ userId: '123' });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockPayments);
    });

    it('should return an error if user has no payments', async () => {
      Payment.find.mockResolvedValue([]);

      const res = await request(app).get('/getuserpay').query({ userId: '123' });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Error retrieving user payments');
    });
  });
});
