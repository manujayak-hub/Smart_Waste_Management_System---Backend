// FeedbackService.test.js
import FeedbackService from '../Services/FeedbackService.js';
import FeedbackRepository from '../Repositories/FeedbackRepository.js';

// Mocking the FeedbackRepository
jest.mock('../Repositories/FeedbackRepository.js');

describe('FeedbackService', () => {
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockFeedbackData = {
    userId: 'user123',
    emailAddress: 'test@example.com',
    contactNumber: '1234567890',
    area: 'Some Area',
    feedbackType: 'General',
    message: 'This is a feedback message.',
  };

  const feedbackId = 'feedback123';

  // Positive test cases
  it('should create feedback successfully', async () => {
    FeedbackRepository.createFeedback.mockResolvedValue(mockFeedbackData);

    const result = await FeedbackService.createFeedback(mockFeedbackData);
    expect(result).toEqual(mockFeedbackData);
    expect(FeedbackRepository.createFeedback).toHaveBeenCalledWith(mockFeedbackData);
  });

  it('should get all feedbacks successfully', async () => {
    FeedbackRepository.getAllFeedbacks.mockResolvedValue([mockFeedbackData]);

    const result = await FeedbackService.getAllFeedbacks();
    expect(result).toEqual([mockFeedbackData]);
    expect(FeedbackRepository.getAllFeedbacks).toHaveBeenCalled();
  });

  it('should get feedback by email successfully', async () => {
    FeedbackRepository.getFeedbackByEmail.mockResolvedValue([mockFeedbackData]);

    const result = await FeedbackService.getFeedbackByEmail('test@example.com');
    expect(result).toEqual([mockFeedbackData]);
    expect(FeedbackRepository.getFeedbackByEmail).toHaveBeenCalledWith('test@example.com');
  });

  it('should delete feedback successfully', async () => {
    FeedbackRepository.deleteFeedback.mockResolvedValue(mockFeedbackData);

    const result = await FeedbackService.deleteFeedback(feedbackId);
    expect(result).toEqual(mockFeedbackData);
    expect(FeedbackRepository.deleteFeedback).toHaveBeenCalledWith(feedbackId);
  });

  it('should get feedback by ID successfully', async () => {
    FeedbackRepository.getFeedbackById.mockResolvedValue(mockFeedbackData);

    const result = await FeedbackService.getFeedbackById(feedbackId);
    expect(result).toEqual(mockFeedbackData);
    expect(FeedbackRepository.getFeedbackById).toHaveBeenCalledWith(feedbackId);
  });

  it('should update feedback successfully', async () => {
    const updatedData = { message: 'Updated feedback message.' };
    FeedbackRepository.updateFeedback.mockResolvedValue({ ...mockFeedbackData, ...updatedData });

    const result = await FeedbackService.updateFeedback(feedbackId, updatedData);
    expect(result).toEqual({ ...mockFeedbackData, ...updatedData });
    expect(FeedbackRepository.updateFeedback).toHaveBeenCalledWith(feedbackId, updatedData);
  });

  it('should add a response successfully', async () => {
    const response = 'This is a response.';
    FeedbackRepository.addResponse.mockResolvedValue({ ...mockFeedbackData, response });

    const result = await FeedbackService.addResponse(feedbackId, response);
    expect(result).toEqual({ ...mockFeedbackData, response });
    expect(FeedbackRepository.addResponse).toHaveBeenCalledWith(feedbackId, response);
  });

  

  it('should get feedbacks by user ID successfully', async () => {
    const userId = 'user123';
    FeedbackRepository.getFeedbacksByUserId.mockResolvedValue([mockFeedbackData]);

    const result = await FeedbackService.getFeedbacksByUserId(userId);
    expect(result).toEqual([mockFeedbackData]);
    expect(FeedbackRepository.getFeedbacksByUserId).toHaveBeenCalledWith(userId);
  });

  // Negative test cases
  it('should throw an error when creating feedback fails', async () => {
    FeedbackRepository.createFeedback.mockRejectedValue(new Error('Database error'));

    await expect(FeedbackService.createFeedback(mockFeedbackData)).rejects.toThrow('Database error');
  });

  it('should throw an error when getting all feedbacks fails', async () => {
    FeedbackRepository.getAllFeedbacks.mockRejectedValue(new Error('Database error'));

    await expect(FeedbackService.getAllFeedbacks()).rejects.toThrow('Database error');
  });

  it('should throw an error when getting feedback by email fails', async () => {
    FeedbackRepository.getFeedbackByEmail.mockRejectedValue(new Error('Database error'));

    await expect(FeedbackService.getFeedbackByEmail('test@example.com')).rejects.toThrow('Database error');
  });

  it('should throw an error when deleting feedback fails', async () => {
    FeedbackRepository.deleteFeedback.mockRejectedValue(new Error('Database error'));

    await expect(FeedbackService.deleteFeedback(feedbackId)).rejects.toThrow('Database error');
  });

  it('should throw an error when getting feedback by ID fails', async () => {
    FeedbackRepository.getFeedbackById.mockRejectedValue(new Error('Database error'));

    await expect(FeedbackService.getFeedbackById(feedbackId)).rejects.toThrow('Database error');
  });

  it('should throw an error when updating feedback fails', async () => {
    const updatedData = { message: 'Updated feedback message.' };
    FeedbackRepository.updateFeedback.mockRejectedValue(new Error('Database error'));

    await expect(FeedbackService.updateFeedback(feedbackId, updatedData)).rejects.toThrow('Database error');
  });

  it('should throw an error when adding a response fails', async () => {
    const response = 'This is a response.';
    FeedbackRepository.addResponse.mockRejectedValue(new Error('Database error'));

    await expect(FeedbackService.addResponse(feedbackId, response)).rejects.toThrow('Database error');
  });

  it('should throw an error when getting feedbacks by user ID fails', async () => {
    const userId = 'user123';
    FeedbackRepository.getFeedbacksByUserId.mockRejectedValue(new Error('Database error'));

    await expect(FeedbackService.getFeedbacksByUserId(userId)).rejects.toThrow('Database error');
  });

});
