
import Schedule from '../Models/ScheduleModel.js';

class ScheduleRepository {
  // Get all schedules
  async getAll() {
    return await Schedule.find();
  }

  // Get schedule by ID
  async getById(id) {
    return await Schedule.findById(id);
  }

  // Get schedules by user ID
  async getByUserId(userid) {
    return await Schedule.find({ userid });
  }

  // Create new schedule
  async create(scheduleData) {
    const schedule = new Schedule(scheduleData);
    return await schedule.save();
  }

  // Update schedule by ID
  async update(id, updates) {
    return await Schedule.findByIdAndUpdate(id, updates, { new: true });
  }

  // Delete schedule by ID
  async delete(id) {
    return await Schedule.findByIdAndDelete(id);
  }

  
}

export default new ScheduleRepository();
