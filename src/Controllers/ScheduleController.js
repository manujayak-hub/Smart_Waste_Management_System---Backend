import Schedule from '../Models/ScheduleModel.js'; // Adjust the import path accordingly

// Get all schedules (not user-specific)
const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get schedules by ID
const getSchedulesById = async (req, res) => {
  const { id } = req.params; 

  try {
    const schedules = await Schedule.findById(id);
    if (schedules.length === 0) {
      return res.status(404).json({ message: 'No schedules found for this id.' });
    }
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get schedules by user ID
const getSchedulesByUserId = async (req, res) => {
  const { userid } = req.params; // Extract userid from the request parameters

  try {
    const schedules = await Schedule.find({ userid });
    if (schedules.length === 0) {
      return res.status(404).json({ message: 'No schedules found for this user.' });
    }
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new schedule
const createSchedule = async (req, res) => {
  const { fname, lname, mobile, email,cdate, timeslot, jobstatus, type, description, userid } = req.body;

  const schedule = new Schedule({
    fname,
    lname,
    mobile,
    email,
    cdate,
    timeslot,
    jobstatus,
    type,
    description,
    userid,
    
  });

  try {
    const savedSchedule = await schedule.save();
    res.status(201).json(savedSchedule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a schedule by ID
const updateSchedule = async (req, res) => {
  const { id } = req.params; // Extract schedule ID from the request parameters
  const updates = req.body; // Get updates from the request body

  try {
    const updatedSchedule = await Schedule.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedSchedule) {
      return res.status(404).json({ message: 'Schedule not found.' });
    }
    res.status(200).json(updatedSchedule);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a schedule by ID
const deleteSchedule = async (req, res) => {
  const { id } = req.params; // Extract schedule ID from the request parameters

  try {
    const deletedSchedule = await Schedule.findByIdAndDelete(id);
    if (!deletedSchedule) {
      return res.status(404).json({ message: 'Schedule not found.' });
    }
    res.status(200).json({ message: 'Schedule deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a schedule by ID (without requiring user ID)
const deleteScheduleWithoutUserId = async (req, res) => {
    const { id } = req.params; // Extract schedule ID from the request parameters
  
    try {
      const deletedSchedule = await Schedule.findByIdAndDelete(id);
      if (!deletedSchedule) {
        return res.status(404).json({ message: 'Schedule not found.' });
      }
      res.status(200).json({ message: 'Schedule deleted successfully.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Exporting all functions
export default {
  getAllSchedules,
  getSchedulesByUserId,
  createSchedule,
  updateSchedule,
  deleteSchedule,
  deleteScheduleWithoutUserId,
  getSchedulesById
};
