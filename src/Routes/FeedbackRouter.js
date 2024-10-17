import express from 'express';
import { getAllFeedbacks, createFeedback,getFeedbackByEmail,deleteFeedback,updateFeedback,getFeedbackById,addResponse,deleteResponse, getFeedbacksByUserId} from '../Controllers/FeedbackController.js';

const router = express.Router();

// Route to get all feedbacks
router.get('/all', getAllFeedbacks);

// Route to create new feedback
router.post('/', createFeedback);

// Route for fetching feedback by email
router.get("/:email", getFeedbackByEmail);


// Delete feedback by ID
router.delete('/:id', deleteFeedback);

router.get('/doc/:id', getFeedbackById);

router.put('/:id', updateFeedback); // Update feedback by ID

// Add response to feedback
router.put('/response/:id', addResponse); // New route for adding a response

// Delete response from feedback
router.delete('/response/:id', deleteResponse); // New route for deleting a response



// Route to fetch feedbacks by userId
router.get('/user/:userId', getFeedbacksByUserId); // New route for feedback by userId
export default router;

