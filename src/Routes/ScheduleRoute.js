// Routes/ScheduleRoutes.js
import express from 'express';
import ScheduleController from '../Controllers/ScheduleController.js';

const ScheduleRouter = express.Router();

// Get all schedules (not user-specific)
ScheduleRouter.get('/view', ScheduleController.getAllSchedules);

// Get schedules by user ID
ScheduleRouter.get('/user/:userid', ScheduleController.getSchedulesByUserId);

// Create a new schedule
ScheduleRouter.post('/create', ScheduleController.createSchedule);

// Update a schedule by ID
ScheduleRouter.put('/:id', ScheduleController.updateSchedule);

// Delete a schedule by ID
ScheduleRouter.delete('/:id', ScheduleController.deleteSchedule);

// Get schedule by ID
ScheduleRouter.get('/doc/:id', ScheduleController.getSchedulesById);



export default ScheduleRouter;
