// Services/ScheduleService.js
import ScheduleRepository from '../Repositories/ScheduleRepository.js';

class ScheduleService {
  async getAllSchedules() {
    return await ScheduleRepository.getAll();
  }

  async getScheduleById(id) {
    const schedule = await ScheduleRepository.getById(id);
    if (!schedule) {
      throw new Error('No schedule found for this ID.');
    }
    return schedule;
  }

  async getSchedulesByUserId(userid) {
    const schedules = await ScheduleRepository.getByUserId(userid);
    if (!schedules || schedules.length === 0) {
      throw new Error('No schedules found for this user.');
    }
    return schedules;
  }

  async createSchedule(scheduleData) {
    return await ScheduleRepository.create(scheduleData);
  }

  async updateSchedule(id, updates) {
    const updatedSchedule = await ScheduleRepository.update(id, updates);
    if (!updatedSchedule) {
      throw new Error('Schedule not found.');
    }
    return updatedSchedule;
  }

  async deleteSchedule(id) {
    const deletedSchedule = await ScheduleRepository.delete(id);
    if (!deletedSchedule) {
      throw new Error('Schedule not found.');
    }
    return deletedSchedule;
  }

  
}

export default new ScheduleService();
