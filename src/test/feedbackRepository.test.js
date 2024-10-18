import FeedbackService from '../Services/FeedbackService.js';
import Feedback from '../Models/FeedbackModel.js'; 

jest.mock('../Models/FeedbackModel.js'); // Mocking the Feedback model

describe('FeedbackService', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mock data before each test
    });

    // Test for getAllFeedbacks
    describe('getAllFeedbacks', () => {
        it('should return all feedbacks', async () => {
            const mockFeedbacks = [
                { _id: '1', emailAddress: 'test@example.com', message: 'Feedback 1' },
                { _id: '2', emailAddress: 'test2@example.com', message: 'Feedback 2' },
            ];
            Feedback.find.mockResolvedValue(mockFeedbacks); 

            const result = await FeedbackService.getAllFeedbacks(); 
            expect(result).toEqual(mockFeedbacks); // Check the result
            expect(Feedback.find).toHaveBeenCalledTimes(1); 
        });
    });

    // Test for createFeedback
    describe('createFeedback', () => {
        it('should create a new feedback and return it', async () => {
            const feedbackData = {
                userId: '67890',
                emailAddress: 'newuser@example.com',
                contactNumber: '1234567890',
                area: 'Downtown',
                feedbackType: 'General',
                message: 'This is another feedback',
            };

            const mockFeedback = new Feedback(feedbackData);
            Feedback.prototype.save.mockResolvedValue(mockFeedback); 

            const result = await FeedbackService.createFeedback(feedbackData); 
            expect(result).toEqual(mockFeedback); 
            expect(Feedback.prototype.save).toHaveBeenCalledTimes(1); 
        });
    });

    // Test for getFeedbackByEmail
    describe('getFeedbackByEmail', () => {
        it('should return feedbacks by email', async () => {
            const mockFeedbacks = [{ _id: '1', emailAddress: 'test@example.com', message: 'Feedback 1' }];
            Feedback.find.mockResolvedValue(mockFeedbacks); 

            const result = await FeedbackService.getFeedbackByEmail('test@example.com'); 
            expect(result).toEqual(mockFeedbacks); 
            expect(Feedback.find).toHaveBeenCalledWith({ emailAddress: 'test@example.com' }); 
        });
    });

    // Test for deleteFeedback
    describe('deleteFeedback', () => {
        it('should delete feedback by ID and return it', async () => {
            const mockFeedback = { _id: '1', emailAddress: 'test@example.com', message: 'Feedback 1' };
            Feedback.findByIdAndDelete.mockResolvedValue(mockFeedback); 

            const result = await FeedbackService.deleteFeedback('1'); 
            expect(result).toEqual(mockFeedback); 
            expect(Feedback.findByIdAndDelete).toHaveBeenCalledWith('1'); 
        });
    });

    // Test for getFeedbackById
    describe('getFeedbackById', () => {
        it('should return feedback by ID', async () => {
            const mockFeedback = { _id: '1', emailAddress: 'test@example.com', message: 'Feedback 1' };
            Feedback.findById.mockResolvedValue(mockFeedback); 

            const result = await FeedbackService.getFeedbackById('1'); 
            expect(result).toEqual(mockFeedback); 
            expect(Feedback.findById).toHaveBeenCalledWith('1'); 
        });
    });

    // Test for updateFeedback
    describe('updateFeedback', () => {
        it('should update feedback by ID and return it', async () => {
            const mockUpdatedFeedback = { _id: '1', emailAddress: 'test@example.com', message: 'Updated Feedback' };
            Feedback.findByIdAndUpdate.mockResolvedValue(mockUpdatedFeedback); 

            const result = await FeedbackService.updateFeedback('1', { message: 'Updated Feedback' }); 
            expect(result).toEqual(mockUpdatedFeedback); 
            expect(Feedback.findByIdAndUpdate).toHaveBeenCalledWith('1', { message: 'Updated Feedback' }, { new: true }); 
        });
    });

    // Test for addResponse
    describe('addResponse', () => {
        it('should add a response to feedback and return it', async () => {
            const mockFeedbackWithResponse = { _id: '1', emailAddress: 'test@example.com', response: 'Admin response' };
            Feedback.findByIdAndUpdate.mockResolvedValue(mockFeedbackWithResponse); 

            const result = await FeedbackService.addResponse('1', 'Admin response'); 
            expect(result).toEqual(mockFeedbackWithResponse); 
            expect(Feedback.findByIdAndUpdate).toHaveBeenCalledWith('1', { response: 'Admin response' }, { new: true });
        });
    });

    // Test for deleteResponse
    describe('deleteResponse', () => {
        it('should delete the response from feedback and return it', async () => {
            const mockFeedbackWithoutResponse = { _id: '1', emailAddress: 'test@example.com' };
            Feedback.findByIdAndUpdate.mockResolvedValue(mockFeedbackWithoutResponse); 

            const result = await FeedbackService.deleteResponse('1'); 
            expect(result).toEqual(mockFeedbackWithoutResponse); 
            expect(Feedback.findByIdAndUpdate).toHaveBeenCalledWith('1', { $unset: { response: '' } }, { new: true }); 
        });
    });

    // Test for getFeedbacksByUserId
    describe('getFeedbacksByUserId', () => {
        it('should return feedbacks by userId', async () => {
            const mockFeedbacks = [
                { _id: '1', userId: '12345', message: 'Feedback 1' },
                { _id: '2', userId: '12345', message: 'Feedback 2' },
            ];
            Feedback.find.mockResolvedValue(mockFeedbacks); 

            const result = await FeedbackService.getFeedbacksByUserId('12345'); 
            expect(result).toEqual(mockFeedbacks); 
            expect(Feedback.find).toHaveBeenCalledWith({ userId: '12345' }); 
        });
    });
});
