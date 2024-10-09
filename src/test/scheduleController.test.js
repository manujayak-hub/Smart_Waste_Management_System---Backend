import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import ScheduleController from '../Controllers/ScheduleController.js';
import Schedule from '../Models/ScheduleModel.js'; // Adjust the import path accordingly

// Initialize the app and use express.json for parsing request body
const app = express();
app.use(express.json());

// Mock the Schedule model methods
jest.mock('../Models/ScheduleModel.js');

// Set up routes for testing
app.get('/schedules', ScheduleController.getAllSchedules);
app.get('/schedules/user/:userid', ScheduleController.getSchedulesByUserId);
app.post('/schedules', ScheduleController.createSchedule);
app.put('/schedules/:id', ScheduleController.updateSchedule);
app.delete('/schedules/:id', ScheduleController.deleteSchedule);
app.delete('/schedules/without-user/:id', ScheduleController.deleteScheduleWithoutUserId);

describe('Schedule Controller', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test for getting all schedules
  describe('GET /schedules', () => {
    it('should return all schedules', async () => {
      const mockSchedules = [
        { fname: 'John', lname: 'Doe', userid: '1' },
        { fname: 'Jane', lname: 'Doe', userid: '2' }
      ];
      Schedule.find.mockResolvedValue(mockSchedules); // Mocking the database call

      const response = await request(app).get('/schedules');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockSchedules);
    });

    it('should return an error if something goes wrong', async () => {
      Schedule.find.mockRejectedValue(new Error('Error occurred'));

      const response = await request(app).get('/schedules');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Error occurred');
    });
  });

  // Test for getting schedules by user ID
  describe('GET /schedules/user/:userid', () => {
    it('should return schedules for a specific user', async () => {
      const mockSchedules = [{ fname: 'John', lname: 'Doe', userid: '1' }];
      Schedule.find.mockResolvedValue(mockSchedules);

      const response = await request(app).get('/schedules/user/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockSchedules);
    });

    it('should return 404 if no schedules are found for the user', async () => {
      Schedule.find.mockResolvedValue([]);

      const response = await request(app).get('/schedules/user/1');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'No schedules found for this user.');
    });
  });

  // Test for creating a new schedule
  describe('POST /schedules', () => {
    it('should create a new schedule and return it', async () => {
      const mockSchedule = { fname: 'John', lname: 'Doe', userid: '1' };
      Schedule.prototype.save.mockResolvedValue(mockSchedule);

      const response = await request(app)
        .post('/schedules')
        .send({ fname: 'John', lname: 'Doe', userid: '1', mobile: '1234567890', email: 'john@example.com', timeslot: 'morning', jobstatus: true, type: 'garbage', description: 'Pick up garbage' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockSchedule);
    });

    it('should return a validation error if required fields are missing', async () => {
      const response = await request(app)
        .post('/schedules')
        .send({ fname: 'John', userid: '1' }); // Incomplete data

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('error');
    });
  });

  // Test for updating a schedule
  describe('PUT /schedules/:id', () => {
    it('should update a schedule and return it', async () => {
      const mockUpdatedSchedule = { fname: 'John', lname: 'Doe', userid: '1', mobile: '9876543210' };
      Schedule.findByIdAndUpdate.mockResolvedValue(mockUpdatedSchedule);

      const response = await request(app)
        .put('/schedules/123')
        .send({ mobile: '9876543210' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUpdatedSchedule);
    });

    it('should return 404 if the schedule is not found', async () => {
      Schedule.findByIdAndUpdate.mockResolvedValue(null);

      const response = await request(app)
        .put('/schedules/123')
        .send({ mobile: '9876543210' });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Schedule not found.');
    });
  });

  // Test for deleting a schedule by ID
  describe('DELETE /schedules/:id', () => {
    it('should delete a schedule and return success message', async () => {
      Schedule.findByIdAndDelete.mockResolvedValue({ fname: 'John', lname: 'Doe', userid: '1' });

      const response = await request(app).delete('/schedules/123');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Schedule deleted successfully.');
    });

    it('should return 404 if the schedule is not found', async () => {
      Schedule.findByIdAndDelete.mockResolvedValue(null);

      const response = await request(app).delete('/schedules/123');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Schedule not found.');
    });
  });

  // Test for deleting a schedule without user ID
  describe('DELETE /schedules/without-user/:id', () => {
    it('should delete a schedule without requiring a user ID', async () => {
      Schedule.findByIdAndDelete.mockResolvedValue({ fname: 'John', lname: 'Doe', userid: '1' });

      const response = await request(app).delete('/schedules/without-user/123');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Schedule deleted successfully.');
    });

    it('should return 404 if the schedule is not found', async () => {
      Schedule.findByIdAndDelete.mockResolvedValue(null);

      const response = await request(app).delete('/schedules/without-user/123');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Schedule not found.');
    });
  });

});
