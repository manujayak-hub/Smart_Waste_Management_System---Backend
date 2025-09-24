// src/Services/ScheduleService.js
import ScheduleRepository from '../Repositories/ScheduleRepository.js';

/*
  Main vulnerabilities addressed:
  1. No input validation → allows malformed IDs / huge objects / type confusion (risk: NoSQL injection, crashes).
  2. No sanitization → attacker can send keys like "$gt" or "constructor" / "__proto__" to attempt operator/prototype pollution.
  3. Raw thrown Errors may leak internals; unhandled repo exceptions may crash caller.
  4. No size/shape limits → extremely large objects can cause DoS.
  5. No defensive ID format checking → prevents obvious invalid lookups and potential injection into DB queries.
  6. Information Disclosure → avoid leaking stack traces, error internals, or framework identifiers.
     (Fixed by returning only generic errors to clients and logging details server-side.)
*/

function isProbablyObjectId(id) {
  return typeof id === 'string' && /^[a-fA-F0-9]{24}$/.test(id);
}

function sanitizeObject(obj, depth = 0, maxDepth = 8) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (depth > maxDepth) return {};

  const cleaned = Object.create(null);

  for (const key of Object.keys(obj)) {
    if (key.startsWith('$') || key.includes('.') ||
        key === '__proto__' || key === 'constructor' || key === 'prototype') {
      continue;
    }

    const val = obj[key];

    if (val && typeof val === 'object') {
      cleaned[key] = sanitizeObject(val, depth + 1, maxDepth);
    } else if (typeof val === 'string') {
      // Strip HTML tags / < and > to prevent accidental XSS
      const safeVal = val.replace(/[<>]/g, '');
      cleaned[key] = safeVal.trim();
    } else {
      cleaned[key] = val;
    }
  }

  return cleaned;
}

function validateScheduleData(scheduleData) {
  if (scheduleData == null || typeof scheduleData !== 'object' || Array.isArray(scheduleData)) {
    throw new Error('Invalid schedule data format.');
  }

  const keys = Object.keys(scheduleData);
  if (keys.length > 200) {
    throw new Error('Schedule data has too many fields.');
  }

  ['fname','lname','mobile','email','area','timeslot','type','description'].forEach(field => {
    if (typeof scheduleData[field] === 'string' && scheduleData[field].length > 2000) {
      throw new Error(`${field} is too long.`);
    }
  });

  return true;
}

class ScheduleService {
  async getAllSchedules() {
    try {
      return await ScheduleRepository.getAll();
    } catch (err) {
      // SERVER LOGGING ONLY — client never sees stack trace
      console.error('ScheduleService.getAllSchedules error:', err?.message || err);
      throw new Error('Failed to fetch schedules.'); // generic message → prevents info disclosure
    }
  }

  async getScheduleById(id) {
    try {
      if (!id) throw new Error('No schedule id provided.');
      if (typeof id !== 'string') throw new Error('Invalid schedule id type.');
      if (!isProbablyObjectId(id) && id.length > 100) throw new Error('Invalid schedule id format.');

      const schedule = await ScheduleRepository.getById(id);
      if (!schedule) throw new Error('No schedule found for this ID.');
      return schedule;
    } catch (err) {
      if (err?.message && [
        'No schedule found for this ID.',
        'No schedule id provided.',
        'Invalid schedule id type.',
        'Invalid schedule id format.'
      ].includes(err.message)) {
        throw err;
      }
      // Only log details internally
      console.error('ScheduleService.getScheduleById error:', err?.message || err);
      throw new Error('Failed to fetch schedule.'); // generic for client
    }
  }

  async getSchedulesByUserId(userid) {
    try {
      if (!userid) throw new Error('No user id provided.');
      if (typeof userid !== 'string') throw new Error('Invalid user id type.');
      if (!isProbablyObjectId(userid) && userid.length > 100) throw new Error('Invalid user id format.');

      const schedules = await ScheduleRepository.getByUserId(userid);
      if (!schedules || schedules.length === 0) throw new Error('No schedules found for this user.');
      return schedules;
    } catch (err) {
      if (err?.message && [
        'No schedules found for this user.',
        'No user id provided.',
        'Invalid user id type.',
        'Invalid user id format.'
      ].includes(err.message)) {
        throw err;
      }
      console.error('ScheduleService.getSchedulesByUserId error:', err?.message || err);
      throw new Error('Failed to fetch schedules for user.');
    }
  }

  async createSchedule(scheduleData) {
    try {
      validateScheduleData(scheduleData);
      const clean = sanitizeObject(scheduleData);

      const serialized = JSON.stringify(clean);
      if (serialized.length > 20000) throw new Error('Schedule data too large.');

      return await ScheduleRepository.create(clean);
    } catch (err) {
      if (err?.message && [
        'Invalid schedule data format.',
        'Schedule data has too many fields.',
        'Schedule data too large.'
      ].includes(err.message)) {
        throw err;
      }
      console.error('ScheduleService.createSchedule error:', err?.message || err);
      throw new Error('Failed to create schedule.');
    }
  }

  async updateSchedule(id, updates) {
    try {
      if (!id) throw new Error('No schedule id provided.');
      if (typeof id !== 'string') throw new Error('Invalid schedule id type.');
      if (!isProbablyObjectId(id) && id.length > 100) throw new Error('Invalid schedule id format.');

      validateScheduleData(updates);
      const cleanUpdates = sanitizeObject(updates);

      const serialized = JSON.stringify(cleanUpdates);
      if (serialized.length > 20000) throw new Error('Update payload too large.');

      const updatedSchedule = await ScheduleRepository.update(id, cleanUpdates);
      if (!updatedSchedule) throw new Error('Schedule not found.');
      return updatedSchedule;
    } catch (err) {
      if (err?.message && [
        'Schedule not found.',
        'No schedule id provided.',
        'Invalid schedule id type.',
        'Invalid schedule id format.',
        'Update payload too large.'
      ].includes(err.message)) {
        throw err;
      }
      console.error('ScheduleService.updateSchedule error:', err?.message || err);
      throw new Error('Failed to update schedule.');
    }
  }

  async deleteSchedule(id) {
    try {
      if (!id) throw new Error('No schedule id provided.');
      if (typeof id !== 'string') throw new Error('Invalid schedule id type.');
      if (!isProbablyObjectId(id) && id.length > 100) throw new Error('Invalid schedule id format.');

      const deletedSchedule = await ScheduleRepository.delete(id);
      if (!deletedSchedule) throw new Error('Schedule not found.');
      return deletedSchedule;
    } catch (err) {
      if (err?.message && [
        'Schedule not found.',
        'No schedule id provided.',
        'Invalid schedule id type.',
        'Invalid schedule id format.'
      ].includes(err.message)) {
        throw err;
      }
      console.error('ScheduleService.deleteSchedule error:', err?.message || err);
      throw new Error('Failed to delete schedule.');
    }
  }
}

export default new ScheduleService();
