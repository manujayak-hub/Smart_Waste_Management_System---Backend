import FeedbackService from '../Services/FeedbackService.js';
import FeedbackRepository from '../Repositories/FeedbackRepository.js';

jest.mock('../Repositories/FeedbackRepository.js'); // Mock the FeedbackRepository

describe('FeedbackService', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  test('getAllFeedbacks should return all feedbacks', async () => {
    const mockFeedbacks = [{ emailAddress: 'test@example.com', message: 'Great service!' }];
    FeedbackRepository.getAllFeedbacks.mockResolvedValue(mockFeedbacks); // Mock return value

    const feedbacks = await FeedbackService.getAllFeedbacks();
    expect(feedbacks).toEqual(mockFeedbacks);
    expect(FeedbackRepository.getAllFeedbacks).toHaveBeenCalledTimes(1); 
  });

  test('createFeedback should create feedback and return it', async () => {
    const feedbackData = { userId: '67890', emailAddress: 'newuser@example.com', message: 'This is another feedback' };
    FeedbackRepository.createFeedback.mockResolvedValue(feedbackData); // Mock return value

    const createdFeedback = await FeedbackService.createFeedback(feedbackData);
    expect(createdFeedback).toEqual(feedbackData);
    expect(FeedbackRepository.createFeedback).toHaveBeenCalledWith(feedbackData); 
  });

  test('getFeedbackByEmail should return feedbacks by email', async () => {
    const email = 'test@example.com';
    const mockFeedbacks = [{ emailAddress: email, message: 'Great service!' }];
    FeedbackRepository.getFeedbackByEmail.mockResolvedValue(mockFeedbacks); // Mock return value

    const feedbacks = await FeedbackService.getFeedbackByEmail(email);
    expect(feedbacks).toEqual(mockFeedbacks);
    expect(FeedbackRepository.getFeedbackByEmail).toHaveBeenCalledWith(email);
  });

  test('deleteFeedback should delete feedback by ID', async () => {
    const feedbackId = '12345';
    FeedbackRepository.deleteFeedback.mockResolvedValue(true); // Mock successful deletion

    const result = await FeedbackService.deleteFeedback(feedbackId);
    expect(result).toBe(true);
    expect(FeedbackRepository.deleteFeedback).toHaveBeenCalledWith(feedbackId);
  });

  test('getFeedbackById should return feedback by ID', async () => {
    const feedbackId = '12345';
    const mockFeedback = { _id: feedbackId, emailAddress: 'test@example.com', message: 'Great service!' };
    FeedbackRepository.getFeedbackById.mockResolvedValue(mockFeedback); // Mock return value

    const feedback = await FeedbackService.getFeedbackById(feedbackId);
    expect(feedback).toEqual(mockFeedback);
    expect(FeedbackRepository.getFeedbackById).toHaveBeenCalledWith(feedbackId);
  });

  test('updateFeedback should update feedback and return it', async () => {
    const feedbackId = '12345';
    const updatedData = { message: 'Updated feedback' };
    const mockFeedback = { _id: feedbackId, emailAddress: 'test@example.com', ...updatedData };
    FeedbackRepository.updateFeedback.mockResolvedValue(mockFeedback); // Mock return value

    const feedback = await FeedbackService.updateFeedback(feedbackId, updatedData);
    expect(feedback).toEqual(mockFeedback);
    expect(FeedbackRepository.updateFeedback).toHaveBeenCalledWith(feedbackId, updatedData);
  });

  test('addResponse should add a response to feedback', async () => {
    const feedbackId = '12345';
    const response = 'Thank you for your feedback!';
    const mockFeedback = { _id: feedbackId, response };
    FeedbackRepository.addResponse.mockResolvedValue(mockFeedback); // Mock return value

    const feedback = await FeedbackService.addResponse(feedbackId, response);
    expect(feedback).toEqual(mockFeedback);
    expect(FeedbackRepository.addResponse).toHaveBeenCalledWith(feedbackId, response);
  });

  test('deleteResponse should delete response from feedback', async () => {
    const feedbackId = '12345';
    FeedbackRepository.deleteResponse.mockResolvedValue(true); // Mock successful deletion

    const result = await FeedbackService.deleteResponse(feedbackId);
    expect(result).toBe(true);
    expect(FeedbackRepository.deleteResponse).toHaveBeenCalledWith(feedbackId);
  });

  test('getFeedbacksByUserId should return feedbacks for a specific user', async () => {
    const userId = '67890';
    const mockFeedbacks = [{ userId, emailAddress: 'user@example.com', message: 'Feedback' }];
    FeedbackRepository.getFeedbacksByUserId.mockResolvedValue(mockFeedbacks); // Mock return value

    const feedbacks = await FeedbackService.getFeedbacksByUserId(userId);
    expect(feedbacks).toEqual(mockFeedbacks);
    expect(FeedbackRepository.getFeedbacksByUserId).toHaveBeenCalledWith(userId);
  });
});
