import Feedback from '../Models/FeedbackModel.js';

// Fetch all feedbacks
export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find(); 
    res.json(feedbacks); 
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new feedback
export const createFeedback = async (req, res) => {
  const { userId, emailAddress, contactNumber, area, feedbackType, message } = req.body;
  const feedback = new Feedback({
    userId, 
    emailAddress,
    contactNumber,
    area,
    feedbackType,
    message,
    date: new Date(), 
  });

  try {
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ message: 'Error submitting feedback.' });
  }
};



// Get feedback by email
export const getFeedbackByEmail = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ emailAddress: req.params.email });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedbacks." });
  }
};


// Delete feedback
export const deleteFeedback = async (req, res) => {
  try {
    const feedbackId = req.params.id;

    const deletedFeedback = await Feedback.findByIdAndDelete(feedbackId);

    if (!deletedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting feedback', error });
  }
};


// Get feedback by ID
export const getFeedbackById = async (req, res) => {
  try {
    const feedbackId = req.params.id; 
    console.log('Fetching feedback with ID:', feedbackId); 

    const feedback = await Feedback.findById(feedbackId); 
    console.log('Query executed.'); 

    if (!feedback) {
      console.log('No feedback found with this ID.'); 
      return res.status(404).json({ message: 'Feedback not found' }); 
    }

    console.log('Feedback found:', feedback); 
    res.status(200).json(feedback); 
  } catch (error) {
    console.error('Error fetching feedback by ID:', error);
    res.status(500).json({ message: 'Server error' }); 
  }
};


// Update feedback by ID
export const updateFeedback = async (req, res) => {
  try {
    const feedbackId = req.params.id; 
    const updatedFeedback = await Feedback.findByIdAndUpdate(feedbackId, req.body, { new: true }); 

    if (!updatedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' }); 
    }

    res.status(200).json(updatedFeedback); 
  } catch (error) {
    console.error('Error updating feedback:', error);
    res.status(500).json({ message: 'Error updating feedback' }); 
  }
};

// Add Response
export const addResponse = async (req, res) => {
  try {
    const feedbackId = req.params.id; 
    const { response } = req.body; 

    const updatedFeedback = await Feedback.findByIdAndUpdate(
      feedbackId,
      { response }, 
      { new: true } 
    );

    if (!updatedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.status(200).json(updatedFeedback); 
  } catch (error) {
    console.error('Error adding response:', error);
    res.status(500).json({ message: 'Error adding response' });
  }
};


// Delete Response
export const deleteResponse = async (req, res) => {
  try {
    const feedbackId = req.params.id; 
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      feedbackId,
      { $unset: { response: "" } }, 
      { new: true } 
    );

    if (!updatedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.status(200).json({ message: 'Response deleted successfully', feedback: updatedFeedback }); 
  } catch (error) {
    console.error('Error deleting response:', error);
    res.status(500).json({ message: 'Error deleting response' });
  }
};




// Get feedbacks by userId
export const getFeedbacksByUserId = async (req, res) => {
  const { userId } = req.params; 
  try {
    const feedbacks = await Feedback.find({ userId }); // Fetch feedbacks by userId
    res.status(200).json(feedbacks); 
  } catch (error) {
    console.error('Error fetching feedbacks by userId:', error);
    res.status(500).json({ message: 'Server error' });
  }
};