import request from 'supertest';
import express from 'express';
import UserController from '../Controllers/UserController.js';
import User from '../Models/UserModel.js'; // Adjust the import path accordingly

const app = express();
app.use(express.json()); // For parsing application/json

// Mock User model methods
jest.mock('../Models/UserModel.js');

app.post('/login', UserController.loginUser);
app.post('/signup', UserController.signupUser);
app.post('/logout', UserController.logoutUser);

// Change the name of the test suite here
describe('User Controller', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test case for user login
  describe('POST /login', () => {
    it('should log in a user and return a token', async () => {
      const mockUser = { _id: '123', email: 'test@example.com' };
      User.login.mockResolvedValue(mockUser); // Mocking User login

      const response = await request(app)
        .post('/login')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body.email).toBe('test@example.com');
    });

    it('should return an error if login fails', async () => {
      User.login.mockRejectedValue(new Error('Invalid credentials'));

      const response = await request(app)
        .post('/login')
        .send({ email: 'wrong@example.com', password: 'wrongpassword' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Invalid credentials');
    });
  });

  // Test case for user signup
  describe('POST /signup', () => {
    it('should sign up a user and return a token', async () => {
      const mockUser = { _id: '123', email: 'newuser@example.com' };
      User.signup.mockResolvedValue(mockUser); // Mocking User signup

      const response = await request(app)
        .post('/signup')
        .send({
          fname: 'John',
          lname: 'Doe',
          mobile: '1234567890',
          email: 'newuser@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body.email).toBe('newuser@example.com');
    });

    it('should return an error if signup fails', async () => {
      User.signup.mockRejectedValue(new Error('Email already exists'));

      const response = await request(app)
        .post('/signup')
        .send({
          fname: 'Jane',
          lname: 'Doe',
          mobile: '0987654321',
          email: 'existinguser@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Email already exists');
    });
  });

  // Test case for user logout
  describe('POST /logout', () => {
    it('should log out a user successfully', async () => {
      const response = await request(app)
        .post('/logout')
        .set('Authorization', 'Bearer some_token');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Logged out successfully');
    });

    it('should return a message if no user is logged in', async () => {
      const response = await request(app).post('/logout');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'No user logged in');
    });
  });
});
