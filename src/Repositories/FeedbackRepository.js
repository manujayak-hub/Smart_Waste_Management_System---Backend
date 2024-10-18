import Feedback from '../Models/FeedbackModel.js';

const getAllFeedbacks = async () => {
  return await Feedback.find();
};

const createFeedback = async (feedbackData) => {
  const feedback = new Feedback(feedbackData);
  return await feedback.save();
};

const getFeedbackByEmail = async (email) => {
  return await Feedback.find({ emailAddress: email });
};

const deleteFeedback = async (feedbackId) => {
  return await Feedback.findByIdAndDelete(feedbackId);
};

const getFeedbackById = async (feedbackId) => {
  return await Feedback.findById(feedbackId);
};

const updateFeedback = async (feedbackId, feedbackData) => {
  return await Feedback.findByIdAndUpdate(feedbackId, feedbackData, { new: true });
};

const addResponse = async (feedbackId, response) => {
  return await Feedback.findByIdAndUpdate(feedbackId, { response }, { new: true });
};

const deleteResponse = async (feedbackId) => {
  return await Feedback.findByIdAndUpdate(feedbackId, { $unset: { response: '' } }, { new: true });
};

const getFeedbacksByUserId = async (userId) => {
  return await Feedback.find({ userId });
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
