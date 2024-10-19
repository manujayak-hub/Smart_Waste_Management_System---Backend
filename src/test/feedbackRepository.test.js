// FeedbackRepository.test.js
import FeedbackRepository from '../Repositories/FeedbackRepository.js';
import Feedback from '../Models/FeedbackModel.js';

// Mocking the Feedback model
jest.mock('../Models/FeedbackModel.js');

describe('FeedbackRepository', () => {
  
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

  it('should create a feedback', async () => {
    Feedback.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(mockFeedbackData),
    }));

    const result = await FeedbackRepository.createFeedback(mockFeedbackData);
    expect(result).toEqual(mockFeedbackData);
    expect(Feedback).toHaveBeenCalledWith(mockFeedbackData);
  });

  it('should get all feedbacks', async () => {
    Feedback.find.mockResolvedValue([mockFeedbackData]);

    const result = await FeedbackRepository.getAllFeedbacks();
    expect(result).toEqual([mockFeedbackData]);
    expect(Feedback.find).toHaveBeenCalled();
  });

  it('should get feedback by email', async () => {
    Feedback.find.mockResolvedValue([mockFeedbackData]);

    const result = await FeedbackRepository.getFeedbackByEmail('test@example.com');
    expect(result).toEqual([mockFeedbackData]);
    expect(Feedback.find).toHaveBeenCalledWith({ emailAddress: 'test@example.com' });
  });

  it('should delete feedback', async () => {
    const feedbackId = 'feedback123';
    Feedback.findByIdAndDelete.mockResolvedValue(mockFeedbackData);

    const result = await FeedbackRepository.deleteFeedback(feedbackId);
    expect(result).toEqual(mockFeedbackData);
    expect(Feedback.findByIdAndDelete).toHaveBeenCalledWith(feedbackId);
  });

  it('should get feedback by ID', async () => {
    const feedbackId = 'feedback123';
    Feedback.findById.mockResolvedValue(mockFeedbackData);

    const result = await FeedbackRepository.getFeedbackById(feedbackId);
    expect(result).toEqual(mockFeedbackData);
    expect(Feedback.findById).toHaveBeenCalledWith(feedbackId);
  });

  it('should update feedback by ID', async () => {
    const feedbackId = 'feedback123';
    const updatedData = { message: 'Updated feedback message.' };
    Feedback.findByIdAndUpdate.mockResolvedValue({ ...mockFeedbackData, ...updatedData });

    const result = await FeedbackRepository.updateFeedback(feedbackId, updatedData);
    expect(result).toEqual({ ...mockFeedbackData, ...updatedData });
    expect(Feedback.findByIdAndUpdate).toHaveBeenCalledWith(feedbackId, updatedData, { new: true });
  });

  it('should add a response to feedback', async () => {
    const feedbackId = 'feedback123';
    const response = 'This is a response.';
    Feedback.findByIdAndUpdate.mockResolvedValue({ ...mockFeedbackData, response });

    const result = await FeedbackRepository.addResponse(feedbackId, response);
    expect(result).toEqual({ ...mockFeedbackData, response });
    expect(Feedback.findByIdAndUpdate).toHaveBeenCalledWith(feedbackId, { response }, { new: true });
  });

  it('should delete a response from feedback', async () => {
    const feedbackId = 'feedback123';
    Feedback.findByIdAndUpdate.mockResolvedValue(mockFeedbackData);

    const result = await FeedbackRepository.deleteResponse(feedbackId);
    expect(result).toEqual(mockFeedbackData);
    expect(Feedback.findByIdAndUpdate).toHaveBeenCalledWith(feedbackId, { $unset: { response: '' } }, { new: true });
  });

  it('should get feedbacks by user ID', async () => {
    const userId = 'user123';
    Feedback.find.mockResolvedValue([mockFeedbackData]);

    const result = await FeedbackRepository.getFeedbacksByUserId(userId);
    expect(result).toEqual([mockFeedbackData]);
    expect(Feedback.find).toHaveBeenCalledWith({ userId });
  });

  // Negative test cases
  it('should throw an error when creating feedback fails', async () => {
    Feedback.mockImplementation(() => ({
      save: jest.fn().mockRejectedValue(new Error('Database error')),
    }));

    await expect(FeedbackRepository.createFeedback(mockFeedbackData)).rejects.toThrow('Database error');
  });

  it('should throw an error when fetching all feedbacks fails', async () => {
    Feedback.find.mockRejectedValue(new Error('Database error'));

    await expect(FeedbackRepository.getAllFeedbacks()).rejects.toThrow('Database error');
  });

  it('should throw an error when getting feedback by email fails', async () => {
    Feedback.find.mockRejectedValue(new Error('Database error'));

    await expect(FeedbackRepository.getFeedbackByEmail('test@example.com')).rejects.toThrow('Database error');
  });

  it('should throw an error when deleting feedback fails', async () => {
    const feedbackId = 'feedback123';
    Feedback.findByIdAndDelete.mockRejectedValue(new Error('Database error'));

    await expect(FeedbackRepository.deleteFeedback(feedbackId)).rejects.toThrow('Database error');
  });

  it('should throw an error when getting feedback by ID fails', async () => {
    const feedbackId = 'feedback123';
    Feedback.findById.mockRejectedValue(new Error('Database error'));

    await expect(FeedbackRepository.getFeedbackById(feedbackId)).rejects.toThrow('Database error');
  });

  it('should throw an error when updating feedback fails', async () => {
    const feedbackId = 'feedback123';
    const updatedData = { message: 'Updated feedback message.' };
    Feedback.findByIdAndUpdate.mockRejectedValue(new Error('Database error'));

    await expect(FeedbackRepository.updateFeedback(feedbackId, updatedData)).rejects.toThrow('Database error');
  });

  it('should throw an error when adding a response fails', async () => {
    const feedbackId = 'feedback123';
    const response = 'This is a response.';
    Feedback.findByIdAndUpdate.mockRejectedValue(new Error('Database error'));

    await expect(FeedbackRepository.addResponse(feedbackId, response)).rejects.toThrow('Database error');
  });

  it('should throw an error when deleting a response fails', async () => {
    const feedbackId = 'feedback123';
    Feedback.findByIdAndUpdate.mockRejectedValue(new Error('Database error'));

    await expect(FeedbackRepository.deleteResponse(feedbackId)).rejects.toThrow('Database error');
  });

  it('should throw an error when getting feedbacks by user ID fails', async () => {
    const userId = 'user123';
    Feedback.find.mockRejectedValue(new Error('Database error'));

    await expect(FeedbackRepository.getFeedbacksByUserId(userId)).rejects.toThrow('Database error');
  });

});
