import * as feedbackController from '../Controllers/FeedbackController.js'; 
import FeedbackService from '../Services/FeedbackService.js';

jest.mock('../Services/FeedbackService.js'); // Mock the FeedbackService

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
    jest.clearAllMocks(); // Clear mocks after each test
  });

  test('getAllFeedbacks should fetch all feedbacks', async () => {
    const feedbacks = [{ emailAddress: 'test@example.com', message: 'Great service!' }];
    FeedbackService.getAllFeedbacks.mockResolvedValue(feedbacks);

    const req = mockReq();
    const res = mockRes();

    await feedbackController.getAllFeedbacks(req, res);

    expect(res.json).toHaveBeenCalledWith(feedbacks);
  });

  test('createFeedback should create new feedback', async () => {
    const req = mockReq({}, {
      userId: '67890',
      emailAddress: 'newuser@example.com',
      contactNumber: '1234567890',
      area: 'Downtown',
      feedbackType: 'General',
      message: 'This is a feedback message',
    });
    const res = mockRes();

    await feedbackController.createFeedback(req, res);

    expect(FeedbackService.createFeedback).toHaveBeenCalledWith(expect.objectContaining({
      userId: '67890',
      emailAddress: 'newuser@example.com',
      message: 'This is a feedback message',
      date: expect.any(Date), // Check if date is included
    }));
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Feedback submitted successfully!' });
  });

  test('getFeedbackByEmail should return feedbacks by email', async () => {
    const feedbacks = [{ emailAddress: 'test@example.com', message: 'Great service!' }];
    FeedbackService.getFeedbackByEmail.mockResolvedValue(feedbacks);

    const req = mockReq({ email: 'test@example.com' });
    const res = mockRes();

    await feedbackController.getFeedbackByEmail(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(feedbacks);
  });

  test('deleteFeedback should delete feedback by ID', async () => {
    const req = mockReq({ id: '12345' });
    const res = mockRes();

    await feedbackController.deleteFeedback(req, res);

    expect(FeedbackService.deleteFeedback).toHaveBeenCalledWith('12345');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Feedback deleted successfully' });
  });

  test('getFeedbackById should return feedback by ID', async () => {
    const feedback = { _id: '12345', emailAddress: 'test@example.com', message: 'Great service!' };
    FeedbackService.getFeedbackById.mockResolvedValue(feedback);

    const req = mockReq({ id: '12345' });
    const res = mockRes();

    await feedbackController.getFeedbackById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(feedback);
  });

  test('updateFeedback should update feedback by ID', async () => {
    const req = mockReq({ id: '12345' }, { message: 'Updated feedback' });
    const res = mockRes();
    const updatedFeedback = { _id: '12345', emailAddress: 'test@example.com', message: 'Updated feedback' };
    FeedbackService.updateFeedback.mockResolvedValue(updatedFeedback);

    await feedbackController.updateFeedback(req, res);

    expect(FeedbackService.updateFeedback).toHaveBeenCalledWith('12345', req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedFeedback);
  });

  test('addResponse should add response to feedback', async () => {
    const req = mockReq({ id: '12345' }, { response: 'Thank you for your feedback!' });
    const res = mockRes();
    const updatedFeedback = { _id: '12345', response: 'Thank you for your feedback!' };
    FeedbackService.addResponse.mockResolvedValue(updatedFeedback);

    await feedbackController.addResponse(req, res);

    expect(FeedbackService.addResponse).toHaveBeenCalledWith('12345', req.body.response);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedFeedback);
  });

  test('deleteResponse should delete response from feedback', async () => {
    const req = mockReq({ id: '12345' });
    const res = mockRes();
    FeedbackService.deleteResponse.mockResolvedValue(true);

    await feedbackController.deleteResponse(req, res);

    expect(FeedbackService.deleteResponse).toHaveBeenCalledWith('12345');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Response deleted successfully', feedback: true });
  });

  test('getFeedbacksByUserId should return feedbacks for specific user', async () => {
    const feedbacks = [{ userId: '67890', message: 'Feedback for user' }];
    FeedbackService.getFeedbacksByUserId.mockResolvedValue(feedbacks);

    const req = mockReq({ userId: '67890' });
    const res = mockRes();

    await feedbackController.getFeedbacksByUserId(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(feedbacks);
  });
});
