import express from 'express';
import ScheduleController from '../Controllers/ScheduleController.js'; // Adjust the import path accordingly

const Schedule_Router = express.Router();

// Get all schedules (not user-specific)
Schedule_Router.get('/', ScheduleController.getAllSchedules);

// Get schedules by user ID
Schedule_Router.get('/user/:userid', ScheduleController.getSchedulesByUserId);

// Create a new schedule
Schedule_Router.post('/', ScheduleController.createSchedule);

// Update a schedule by ID
Schedule_Router.put('/:id', ScheduleController.updateSchedule);

// Delete a schedule by ID
Schedule_Router.delete('/:id', ScheduleController.deleteSchedule);

// Delete a schedule by ID without requiring user ID
Schedule_Router.delete('/without-user/:id', ScheduleController.deleteScheduleWithoutUserId);

export default Schedule_Router;
