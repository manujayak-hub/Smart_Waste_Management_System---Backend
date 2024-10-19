import FeedbackService from '../Services/FeedbackService.js';

// Fetch all feedbacks
export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await FeedbackService.getAllFeedbacks();
    res.json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new feedback
export const createFeedback = async (req, res) => {
  const { userId, emailAddress, contactNumber, area, feedbackType, message } = req.body;

  try {
    await FeedbackService.createFeedback({
      userId,
      emailAddress,
      contactNumber,
      area,
      feedbackType,
      message,
      date: new Date(),
    });
    res.status(201).json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ message: 'Error submitting feedback.' });
  }
};

// Get feedback by email
export const getFeedbackByEmail = async (req, res) => {
  try {
    const feedbacks = await FeedbackService.getFeedbackByEmail(req.params.email);
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedbacks.' });
  }
};

// Delete feedback
export const deleteFeedback = async (req, res) => {
  try {
    await FeedbackService.deleteFeedback(req.params.id);
    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting feedback', error });
  }
};

// Get feedback by ID
export const getFeedbackById = async (req, res) => {
  try {
    const feedback = await FeedbackService.getFeedbackById(req.params.id);
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update feedback by ID
export const updateFeedback = async (req, res) => {
  try {
    const updatedFeedback = await FeedbackService.updateFeedback(req.params.id, req.body);
    res.status(200).json(updatedFeedback);
  } catch (error) {
    res.status(500).json({ message: 'Error updating feedback' });
  }
};

// Add Response
export const addResponse = async (req, res) => {
  try {
    const updatedFeedback = await FeedbackService.addResponse(req.params.id, req.body.response);
    res.status(200).json(updatedFeedback);
  } catch (error) {
    res.status(500).json({ message: 'Error adding response' });
  }
};

// Delete Response
export const deleteResponse = async (req, res) => {
  try {
    const updatedFeedback = await FeedbackService.deleteResponse(req.params.id);
    if (!updatedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json({ message: 'Response deleted successfully', feedback: updatedFeedback });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting response' });
  }
};


// Get feedbacks by userId
export const getFeedbacksByUserId = async (req, res) => {
  try {
    const feedbacks = await FeedbackService.getFeedbacksByUserId(req.params.userId);
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
