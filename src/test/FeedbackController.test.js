import * as feedbackController from '../Controllers/FeedbackController.js';
import FeedbackService from '../Services/FeedbackService.js';

jest.mock('../Services/FeedbackService.js');

describe('Feedback Controller', () => {
  const mockRes = () => {
    const res = {};
    res.json = jest.fn();
    res.status = jest.fn().mockReturnValue(res);
    return res;
  };

  const mockReq = (params = {}, body = {}) => ({
    params,
    body,
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('getAllFeedbacks should fetch all feedbacks and handle errors', async () => {
    const feedbacks = [{ emailAddress: 'test@example.com', message: 'Great service!' }];
    FeedbackService.getAllFeedbacks.mockResolvedValue(feedbacks);
    
    // Positive case
    const req = mockReq();
    const res = mockRes();
    await feedbackController.getAllFeedbacks(req, res);
    expect(res.json).toHaveBeenCalledWith(feedbacks);

    // Negative case
    FeedbackService.getAllFeedbacks.mockRejectedValue(new Error('Database error'));
    await feedbackController.getAllFeedbacks(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Server error' });
  });

  test('createFeedback should create feedback and handle errors', async () => {
    const req = mockReq({}, {
      userId: '67890',
      emailAddress: 'newuser@example.com',
      contactNumber: '1234567890',
      area: 'Downtown',
      feedbackType: 'General',
      message: 'This is a feedback message',
    });
    const res = mockRes();

    // Positive case
    await feedbackController.createFeedback(req, res);
    expect(FeedbackService.createFeedback).toHaveBeenCalledWith(expect.objectContaining({
      userId: '67890',
      emailAddress: 'newuser@example.com',
      message: 'This is a feedback message',
      date: expect.any(Date),
    }));
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Feedback submitted successfully!' });

    // Negative case
    FeedbackService.createFeedback.mockRejectedValue(new Error('Submission error'));
    await feedbackController.createFeedback(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error submitting feedback.' });
  });

  test('getFeedbackByEmail should return feedbacks by email and handle errors', async () => {
    const feedbacks = [{ emailAddress: 'test@example.com', message: 'Great service!' }];
    FeedbackService.getFeedbackByEmail.mockResolvedValue(feedbacks);

    // Positive case
    const req = mockReq({ email: 'test@example.com' });
    const res = mockRes();
    await feedbackController.getFeedbackByEmail(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(feedbacks);

    // Negative case
    FeedbackService.getFeedbackByEmail.mockRejectedValue(new Error('Database error'));
    await feedbackController.getFeedbackByEmail(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching feedbacks.' });
  });

  test('deleteFeedback should delete feedback by ID and handle errors', async () => {
    const req = mockReq({ id: '12345' });
    const res = mockRes();

    // Positive case
    await feedbackController.deleteFeedback(req, res);
    expect(FeedbackService.deleteFeedback).toHaveBeenCalledWith('12345');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Feedback deleted successfully' });

    // Negative case
    FeedbackService.deleteFeedback.mockRejectedValue(new Error('Deletion error'));
    await feedbackController.deleteFeedback(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error deleting feedback', error: expect.any(Error) });
  });

  test('getFeedbackById should return feedback by ID and handle errors', async () => {
    const feedback = { _id: '12345', emailAddress: 'test@example.com', message: 'Great service!' };
    FeedbackService.getFeedbackById.mockResolvedValue(feedback);

    // Positive case
    const req = mockReq({ id: '12345' });
    const res = mockRes();
    await feedbackController.getFeedbackById(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(feedback);

    // Negative case
    FeedbackService.getFeedbackById.mockRejectedValue(new Error('Fetch error'));
    await feedbackController.getFeedbackById(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Server error' });
  });

  test('updateFeedback should update feedback by ID and handle errors', async () => {
    const req = mockReq({ id: '12345' }, { message: 'Updated feedback' });
    const res = mockRes();
    const updatedFeedback = { _id: '12345', message: 'Updated feedback' };
    FeedbackService.updateFeedback.mockResolvedValue(updatedFeedback);

    // Positive case
    await feedbackController.updateFeedback(req, res);
    expect(FeedbackService.updateFeedback).toHaveBeenCalledWith('12345', req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedFeedback);

    // Negative case
    FeedbackService.updateFeedback.mockRejectedValue(new Error('Update error'));
    await feedbackController.updateFeedback(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error updating feedback' });
  });

  test('addResponse should add response to feedback and handle errors', async () => {
    const req = mockReq({ id: '12345' }, { response: 'Thank you for your feedback!' });
    const res = mockRes();
    const updatedFeedback = { _id: '12345', response: 'Thank you for your feedback!' };
    FeedbackService.addResponse.mockResolvedValue(updatedFeedback);

    // Positive case
    await feedbackController.addResponse(req, res);
    expect(FeedbackService.addResponse).toHaveBeenCalledWith('12345', req.body.response);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedFeedback);

    // Negative case
    FeedbackService.addResponse.mockRejectedValue(new Error('Response error'));
    await feedbackController.addResponse(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error adding response' });
  });

  test('deleteResponse should delete response and handle errors', async () => {
    const req = mockReq({ id: '12345' });
    const res = mockRes();
  
    // Positive case
    FeedbackService.deleteResponse.mockResolvedValue(null); // Simulate feedback not found
    await feedbackController.deleteResponse(req, res);
    expect(FeedbackService.deleteResponse).toHaveBeenCalledWith('12345');
    expect(res.status).toHaveBeenCalledWith(404); 
    expect(res.json).toHaveBeenCalledWith({ message: 'Feedback not found' });
  
    // Negative case
    FeedbackService.deleteResponse.mockRejectedValue(new Error('Delete error'));
    await feedbackController.deleteResponse(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error deleting response' });
  });
  
  test('getFeedbacksByUserId should return feedbacks for specific user and handle errors', async () => {
    const feedbacks = [{ userId: '67890', message: 'Feedback for user' }];
    FeedbackService.getFeedbacksByUserId.mockResolvedValue(feedbacks);

    // Positive case
    const req = mockReq({ userId: '67890' });
    const res = mockRes();
    await feedbackController.getFeedbacksByUserId(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(feedbacks);

    // Negative case
    FeedbackService.getFeedbacksByUserId.mockRejectedValue(new Error('Fetch error'));
    await feedbackController.getFeedbacksByUserId(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Server error' });
  });
});
