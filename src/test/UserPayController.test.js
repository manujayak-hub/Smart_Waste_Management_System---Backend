import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import UserPayment from '../Models/UserPaymentModel.js';
import { createCheckoutSession, getPayments } from '../Controllers/UserPayController.js';

// Create mock server
const app = express();
app.use(express.json());
app.post('/checkout', createCheckoutSession);
app.get('/get', getPayments);

// Mock the UserPayment model
jest.mock('../Models/UserPaymentModel.js');

// Test Suite
describe('UserPayController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test createCheckoutSession
  describe('POST /checkout', () => {
    it('should create a checkout session and save payment data', async () => {
      const mockItems = [{ name: 'Product A', price: 100 }];
      const mockUserId = '60d5ec49d9a3a56f1c62d0e7';
      const mockSession = { id: 'session_123', url: 'http://localhost:5173/success' };

      // Mock Stripe session creation
      jest.spyOn(require('stripe'), 'default').mockImplementation(() => ({
        checkout: {
          sessions: {
            create: jest.fn().mockResolvedValue(mockSession),
          },
        },
      }));

      // Mock UserPayment save method
      UserPayment.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue({}),
      }));

      const res = await request(app).post('/checkout').send({ items: mockItems, userId: mockUserId });

      expect(res.status).toBe(200);
      expect(res.body.url).toBe(mockSession.url);
      expect(UserPayment).toHaveBeenCalledWith(expect.objectContaining({
        userId: mockUserId,
        items: mockItems,
        totalAmount: 100,
        sessionId: mockSession.id,
        paymentStatus: 'pending',
      }));
    });

    it('should return an error if Stripe fails to create a session', async () => {
      const mockItems = [{ name: 'Product A', price: 100 }];
      const mockUserId = '60d5ec49d9a3a56f1c62d0e7';

      // Mock Stripe to throw an error
      jest.spyOn(require('stripe'), 'default').mockImplementation(() => ({
        checkout: {
          sessions: {
            create: jest.fn().mockRejectedValue(new Error('Stripe Error')),
          },
        },
      }));

      const res = await request(app).post('/checkout').send({ items: mockItems, userId: mockUserId });

      expect(res.status).toBe(500);
      expect(res.body.error).toBe('Stripe Error');
    });
  });

  // Test getPayments
  describe('GET /get', () => {
    it('should return all payments', async () => {
      const mockPayments = [
        { userId: '60d5ec49d9a3a56f1c62d0e7', items: [{ name: 'Product A', price: 100 }] },
        { userId: '60d5ec49d9a3a56f1c62d0e8', items: [{ name: 'Product B', price: 200 }] },
      ];

      UserPayment.find.mockResolvedValue(mockPayments);

      const res = await request(app).get('/get');

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockPayments);
    });

    it('should return an error if no payments found', async () => {
      UserPayment.find.mockRejectedValue(new Error('Error retrieving payments'));

      const res = await request(app).get('/get');

      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Error retrieving payments');
    });
  });
});
