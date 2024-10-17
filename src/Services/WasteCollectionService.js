import WasteCollectionRepository from '../Repositories/WasteCollectionRepository.js';

class WasteCollectionService {
  async getAllWasteRecords() {
    return await WasteCollectionRepository.getAllWasteRecords();
  }

  async getWasteRecordsByResidenceId(residenceId) {
    const records = await WasteCollectionRepository.getWasteRecordsByResidenceId(residenceId);
    if (records.length === 0) {
      throw new Error('No waste collection records found for this residence.');
    }
    return records;
  }

  async getWasteRecordById(id) {
    const record = await WasteCollectionRepository.getWasteRecordById(id);
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
