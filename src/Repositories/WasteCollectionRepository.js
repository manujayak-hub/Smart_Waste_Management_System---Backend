// src/Repositories/WasteCollectionRepository.js
import WasteCollection from '../Models/WasteCollectModel.js';

class WasteCollectionRepository {
  /**
   * Get all waste records with optional pagination and field projection
   * @param {Number} skip - number of records to skip
   * @param {Number} limit - max number of records to return
   * @param {String} fields - space-separated field names to return (projection)
   */
  async getAllWasteRecords(skip = 0, limit = 10, fields = '') {
    return await WasteCollection.find()
      .select(fields)
      .skip(skip)
      .limit(limit)
      .lean();
  }

  /**
   * Get waste records by residence ID with optional field projection
   * @param {String} residenceId 
   * @param {String} fields 
   */
  async getWasteRecordsByResidenceId(residenceId, fields = '') {
    return await WasteCollection.find({ residenceId })
      .select(fields)
      .lean();
  }

  /**
   * Get a single waste record by its ID with optional field projection
   * @param {String} id 
   * @param {String} fields 
   */
  async getWasteRecordById(id, fields = '') {
    return await WasteCollection.findById(id)
      .select(fields)
      .lean();
  }

  /**
   * Create a new waste collection record
   */
  async createWasteRecord(wasteRecordData) {
    const wasteRecord = new WasteCollection(wasteRecordData);
    return await wasteRecord.save();
  }

  /**
   * Update a waste collection record by ID
   */
  async updateWasteRecord(id, updates) {
    return await WasteCollection.findByIdAndUpdate(id, updates, { new: true }).lean();
  }

  /**
   * Delete a waste collection record by ID
   */
  async deleteWasteRecord(id) {
    return await WasteCollection.findByIdAndDelete(id).lean();
  }
}

export default new WasteCollectionRepository();
