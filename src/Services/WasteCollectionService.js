// src/Services/WasteCollectionService.js
import WasteCollectionRepository from '../Repositories/WasteCollectionRepository.js';

class WasteCollectionService {
  async getAllWasteRecords(skip = 0, limit = 10, fields = "") {
    return await WasteCollectionRepository.getAllWasteRecords(skip, limit, fields);
  }

  async getWasteRecordsByResidenceId(residenceId, fields = "") {
    const records = await WasteCollectionRepository.getWasteRecordsByResidenceId(residenceId, fields);
    if (records.length === 0) {
      throw new Error('No waste collection records found for this residence.');
    }
    return records;
  }

  async getWasteRecordById(id, fields = "") {
    const record = await WasteCollectionRepository.getWasteRecordById(id, fields);
    if (!record) {
      throw new Error('Waste collection record not found.');
    }
    return record;
  }

  async createWasteRecord(wasteRecordData) {
    return await WasteCollectionRepository.createWasteRecord(wasteRecordData);
  }

  async updateWasteRecord(id, updates) {
    const updatedRecord = await WasteCollectionRepository.updateWasteRecord(id, updates);
    if (!updatedRecord) {
      throw new Error('Waste collection record not found.');
    }
    return updatedRecord;
  }

  async deleteWasteRecord(id) {
    const deletedRecord = await WasteCollectionRepository.deleteWasteRecord(id);
    if (!deletedRecord) {
      throw new Error('Waste collection record not found.');
    }
    return deletedRecord;
  }
}

export default new WasteCollectionService();
