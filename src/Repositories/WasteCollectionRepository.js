import WasteCollection from '../Models/WasteCollectModel.js';

class WasteCollectionRepository {
  async getAllWasteRecords() {
    return await WasteCollection.find();
  }

  async getWasteRecordsByResidenceId(residenceId) {
    return await WasteCollection.find({ residenceId });
  }

  async getWasteRecordById(id) {
    return await WasteCollection.findById(id);
  }

  async createWasteRecord(wasteRecordData) {
    const wasteRecord = new WasteCollection(wasteRecordData);
    return await wasteRecord.save();
  }

  async updateWasteRecord(id, updates) {
    return await WasteCollection.findByIdAndUpdate(id, updates, { new: true });
  }

  async deleteWasteRecord(id) {
    return await WasteCollection.findByIdAndDelete(id);
  }
}

export default new WasteCollectionRepository();
