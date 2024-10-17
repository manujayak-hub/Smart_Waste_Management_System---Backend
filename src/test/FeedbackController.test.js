import request from 'supertest';
import express from 'express';
import Feedback from '../Models/FeedbackModel.js';
import {
  getAllFeedbacks,
  createFeedback,
  getFeedbackByEmail,
  deleteFeedback,
  getFeedbackById,
  updateFeedback,
  addResponse,
  deleteResponse,
  
  getFeedbacksByUserId
} from '../Controllers/FeedbackController.js'; // Adjust the import path accordingly

const app = express();
app.use(express.json());

// Mock the Feedback model methods
jest.mock('../Models/FeedbackModel.js');

app.get('/feedback/all', getAllFeedbacks);
app.post('/feedback', createFeedback);
app.get('/feedback/:email', getFeedbackByEmail);
app.delete('/feedback/:id', deleteFeedback);
app.get('/feedback/doc/:id', getFeedbackById);
app.put('/feedback/:id', updateFeedback);
app.put('/feedback/response/:id', addResponse);
app.delete('/feedback/response/:id', deleteResponse);

app.get('/feedback/user/:userId', getFeedbacksByUserId);

describe('Feedback Controller', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test for getting all feedbacks
  describe('GET /feedback/all', () => {
    it('should return all feedbacks', async () => {
      const mockFeedbacks = [
        { userId: '12345', emailAddress: 'test@example.com', message: 'This is a test feedback' }
      ];
      Feedback.find.mockResolvedValue(mockFeedbacks);

      const response = await request(app).get('/feedback/all');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockFeedbacks);
    });

    it('should return an error if something goes wrong', async () => {
      Feedback.find.mockRejectedValue(new Error('Error occurred'));

      const response = await request(app).get('/feedback/all');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message', 'Server error');
    });
  });

  // Test for creating new feedback
  describe('POST /feedback', () => {
    it('should create a new feedback and return it', async () => {
      const mockFeedback = { userId: '67890', emailAddress: 'newuser@example.com', message: 'This is another feedback' };
      Feedback.prototype.save.mockResolvedValue(mockFeedback);

      const response = await request(app)
        .post('/feedback')
        .send({ userId: '67890', emailAddress: 'newuser@example.com', contactNumber: '1234567890', area: 'Area 51', feedbackType: 'General', message: 'This is another feedback' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual({ message: 'Feedback submitted successfully!' });
    });

    it('should return an error if feedback submission fails', async () => {
      Feedback.prototype.save.mockRejectedValue(new Error('Error submitting feedback'));

      const response = await request(app)
        .post('/feedback')
        .send({}); // Sending incomplete data

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message', 'Error submitting feedback.');
    });
  });

  // Test for getting feedback by email
  describe('GET /feedback/:email', () => {
    it('should return feedbacks by email', async () => {
      const mockFeedbacks = [{ userId: '12345', emailAddress: 'test@example.com', message: 'This is a test feedback' }];
      Feedback.find.mockResolvedValue(mockFeedbacks);

      const response = await request(app).get('/feedback/test@example.com');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockFeedbacks);
    });

    it('should return an error if fetching feedbacks by email fails', async () => {
      Feedback.find.mockRejectedValue(new Error('Error occurred'));

      const response = await request(app).get('/feedback/test@example.com');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message', 'Error fetching feedbacks.');
    });
  });

  // Test for getting feedback by ID
  describe('GET /feedback/doc/:id', () => {
    it('should return feedback by ID', async () => {
      const mockFeedback = { userId: '12345', emailAddress: 'test@example.com', message: 'This is a test feedback' };
      Feedback.findById.mockResolvedValue(mockFeedback);

      const response = await request(app).get('/feedback/doc/12345');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockFeedback);
    });

    it('should return 404 if feedback is not found', async () => {
      Feedback.findById.mockResolvedValue(null);

      const response = await request(app).get('/feedback/doc/invalidId');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Feedback not found');
    });
  });

  // Test for updating feedback
  describe('PUT /feedback/:id', () => {
    it('should update feedback and return it', async () => {
      const mockUpdatedFeedback = { userId: '12345', emailAddress: 'test@example.com', message: 'Updated feedback message' };
      Feedback.findByIdAndUpdate.mockResolvedValue(mockUpdatedFeedback);

      const response = await request(app).put('/feedback/12345').send({ message: 'Updated feedback message' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUpdatedFeedback);
    });

    it('should return 404 if feedback is not found for update', async () => {
      Feedback.findByIdAndUpdate.mockResolvedValue(null);

      const response = await request(app).put('/feedback/invalidId').send({ message: 'Trying to update non-existing feedback' });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Feedback not found');
    });
  });

  // Test for deleting feedback
  describe('DELETE /feedback/:id', () => {
    it('should delete feedback and return success message', async () => {
      Feedback.findByIdAndDelete.mockResolvedValue({ userId: '12345', emailAddress: 'test@example.com' });

      const response = await request(app).delete('/feedback/12345');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Feedback deleted successfully');
    });

    it('should return 404 if feedback is not found for deletion', async () => {
      Feedback.findByIdAndDelete.mockResolvedValue(null);

      const response = await request(app).delete('/feedback/invalidId');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Feedback not found');
    });
  });

  // Test for adding a response to feedback
  describe('PUT /feedback/response/:id', () => {
    it('should add a response to feedback', async () => {
      const mockFeedbackWithResponse = { userId: '12345', emailAddress: 'test@example.com', response: 'Admin response' };
      Feedback.findByIdAndUpdate.mockResolvedValue(mockFeedbackWithResponse);

      const response = await request(app).put('/feedback/response/12345').send({ response: 'Admin response' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockFeedbackWithResponse);
    });

    it('should return 404 if feedback is not found for response addition', async () => {
      Feedback.findByIdAndUpdate.mockResolvedValue(null);

      const response = await request(app).put('/feedback/response/invalidId').send({ response: 'Admin response' });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Feedback not found');
    });
  });

  // Test for deleting a response
describe('DELETE /feedback/response/:id', () => {
    it('should delete a response from feedback', async () => {
      const mockFeedbackWithoutResponse = { userId: '12345', emailAddress: 'test@example.com' };
      Feedback.findByIdAndUpdate.mockResolvedValue(mockFeedbackWithoutResponse);
  
      const response = await request(app).delete('/feedback/response/12345');
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Response deleted successfully'); // Fix this line
      expect(response.body.feedback).toEqual(mockFeedbackWithoutResponse); // Check the feedback separately
    });
  
    it('should return 404 if feedback is not found for response deletion', async () => {
      Feedback.findByIdAndUpdate.mockResolvedValue(null);
  
      const response = await request(app).delete('/feedback/response/invalidId');
  
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Feedback not found');
    });
  });

  

  // Test for getting feedbacks by userId
  describe('GET /feedback/user/:userId', () => {
    it('should return feedbacks by userId', async () => {
      const mockFeedbacks = [
        { userId: '12345', emailAddress: 'test@example.com', message: 'Feedback 1' },
        { userId: '12345', emailAddress: 'test2@example.com', message: 'Feedback 2' }
      ];
      Feedback.find.mockResolvedValue(mockFeedbacks);

      const response = await request(app).get('/feedback/user/12345');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockFeedbacks);
    });

    it('should return an error if fetching feedbacks by userId fails', async () => {
      Feedback.find.mockRejectedValue(new Error('Error occurred'));

      const response = await request(app).get('/feedback/user/12345');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message', 'Server error');
    });
  });

});
