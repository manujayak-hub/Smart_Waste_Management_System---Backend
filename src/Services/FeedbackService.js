import FeedbackRepository from '../Repositories/FeedbackRepository.js';

const getAllFeedbacks = async () => {
  return await FeedbackRepository.getAllFeedbacks();
};

const createFeedback = async (feedbackData) => {
  return await FeedbackRepository.createFeedback(feedbackData);
};

const getFeedbackByEmail = async (email) => {
  return await FeedbackRepository.getFeedbackByEmail(email);
};

const deleteFeedback = async (feedbackId) => {
  return await FeedbackRepository.deleteFeedback(feedbackId);
};

const getFeedbackById = async (feedbackId) => {
  return await FeedbackRepository.getFeedbackById(feedbackId);
};

const updateFeedback = async (feedbackId, feedbackData) => {
  return await FeedbackRepository.updateFeedback(feedbackId, feedbackData);
};

const addResponse = async (feedbackId, response) => {
  return await FeedbackRepository.addResponse(feedbackId, response);
};

const deleteResponse = async (feedbackId) => {
    const result = await FeedbackRepository.findByIdAndUpdate(feedbackId, { $unset: { response: '' } }, { new: true });
    return result; // This will be null if the feedback was not found
};

const getFeedbacksByUserId = async (userId) => {
  return await FeedbackRepository.getFeedbacksByUserId(userId);
};

export default {
  getAllFeedbacks,
  createFeedback,
  getFeedbackByEmail,
  deleteFeedback,
  getFeedbackById,
  updateFeedback,
  addResponse,
  deleteResponse,
  getFeedbacksByUserId,
};
