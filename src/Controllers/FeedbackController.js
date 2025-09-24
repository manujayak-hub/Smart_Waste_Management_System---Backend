import FeedbackService from '../Services/FeedbackService.js';
import { Joi, celebrate, Segments } from 'celebrate';
import sanitizeHtml from 'sanitize-html';

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
// export const createFeedback = async (req, res) => {
//   const { userId, emailAddress, contactNumber, area, feedbackType, message } = req.body;

//   try {
//     await FeedbackService.createFeedback({
//       userId,
//       emailAddress,
//       contactNumber,
//       area,
//       feedbackType,
//       message,
//       date: new Date(),
//     });
//     res.status(201).json({ message: 'Feedback submitted successfully!' });
//   } catch (error) {
//     console.error('Error submitting feedback:', error);
//     res.status(500).json({ message: 'Error submitting feedback.' });
//   }
// };
// Sanitize input helper
const sanitizeInput = (data) => {
  return {
    emailAddress: sanitizeHtml(data.emailAddress, { allowedTags: [], allowedAttributes: {} }),
    contactNumber: sanitizeHtml(data.contactNumber, { allowedTags: [], allowedAttributes: {} }),
    area: sanitizeHtml(data.area, { allowedTags: [], allowedAttributes: {} }),
    feedbackType: sanitizeHtml(data.feedbackType, { allowedTags: [], allowedAttributes: {} }),
    message: sanitizeHtml(data.message, { allowedTags: [], allowedAttributes: {} }),
    userId: data.userId // ObjectId will be validated in service/model
  };
};

// Create new feedback
export const createFeedback = async (req, res) => {
  try {
    const sanitizedData = sanitizeInput(req.body);
    const feedback = await FeedbackService.createFeedback(sanitizedData);
    res.status(201).json({ message: 'Feedback submitted', feedback });
  } catch (error) {
    console.error('Error creating feedback:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// // Get feedback by email
// export const getFeedbackByEmail = async (req, res) => {
//   try {
//     const feedbacks = await FeedbackService.getFeedbackByEmail(req.params.email);
//     res.status(200).json(feedbacks);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching feedbacks.' });
//   }
// };

// Get feedback by email
export const getFeedbackByEmail = async (req, res) => {
  try {
    // Validate email to prevent NoSQL injection
    const emailSchema = Joi.string().email().required();
    const { error, value: email } = emailSchema.validate(String(req.params.email));
    if (error) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    const feedbacks = await FeedbackService.getFeedbackByEmail(email);
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedback by email:', error);
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

// // Update feedback by ID
// export const updateFeedback = async (req, res) => {
//   try {
//     const updatedFeedback = await FeedbackService.updateFeedback(req.params.id, req.body);
//     res.status(200).json(updatedFeedback);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating feedback' });
//   }
// };

// // Add Response
// export const addResponse = async (req, res) => {
//   try {
//     const updatedFeedback = await FeedbackService.addResponse(req.params.id, req.body.response);
//     res.status(200).json(updatedFeedback);
//   } catch (error) {
//     res.status(500).json({ message: 'Error adding response' });
//   }
// };
export const updateFeedback = async (req, res) => {
  try {
    const allowedFields = ['feedbackType', 'message', 'area']; // Prevent mass-assignment
    const sanitizedData = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        sanitizedData[field] = sanitizeHtml(req.body[field], { allowedTags: [], allowedAttributes: {} });
      }
    });

    const updatedFeedback = await FeedbackService.updateFeedback(req.params.id, sanitizedData);
    res.status(200).json(updatedFeedback);
  } catch (error) {
    res.status(500).json({ message: 'Error updating feedback' });
  }
};

// ------------------------
// Add Response (whitelist 'response' only)
// ------------------------
export const addResponse = async (req, res) => {
  try {
    const sanitizedResponse = sanitizeHtml(req.body.response, { allowedTags: [], allowedAttributes: {} });
    const updatedFeedback = await FeedbackService.addResponse(req.params.id, sanitizedResponse);
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
