// Controllers/ScheduleController.js
import ScheduleService from '../Services/ScheduleService.js';

class ScheduleController {
  async getAllSchedules(req, res) {
    try {
      const schedules = await ScheduleService.getAllSchedules();
      res.status(200).json(schedules);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getSchedulesById(req, res) {
    try {
      const { id } = req.params;
      const schedule = await ScheduleService.getScheduleById(id);
      res.status(200).json(schedule);
    } catch (error) {
      res.status(404).json({ message:'No schedules found for this id.'});
    }
  }

  async getSchedulesByUserId(req, res) {
    try {
      const { userid } = req.params;
      const schedules = await ScheduleService.getSchedulesByUserId(userid);
      res.status(200).json(schedules);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async createSchedule(req, res) {
    try {
      const scheduleData = req.body;
      const schedule = await ScheduleService.createSchedule(scheduleData);
      res.status(201).json(schedule);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateSchedule(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedSchedule = await ScheduleService.updateSchedule(id, updates);
      res.status(200).json(updatedSchedule);
    } catch (error) {
      res.status(404).json({ message:'Schedule not found.' });
    }
  }

  async deleteSchedule(req, res) {
    try {
      const { id } = req.params;
      await ScheduleService.deleteSchedule(id);
      res.status(200).json({ message: 'Schedule deleted successfully.' });
    } catch (error) {
      res.status(404).json({  message:'Schedule not found.'});
    }
  }

  
}

export default new ScheduleController();
