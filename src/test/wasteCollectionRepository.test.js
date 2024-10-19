import WasteCollectionRepository from '../Repositories/WasteCollectionRepository.js';
import WasteCollection from '../Models/WasteCollectModel.js'; // Import the model to mock it
import mongoose from 'mongoose';

jest.mock('../Models/WasteCollectModel.js'); // Mock the model

describe('WasteCollectionRepository', () => {

  afterEach(() => {
    jest.clearAllMocks(); // Clear any mock data between tests
  });

  test('should get all waste records', async () => {
    const mockWasteRecords = [
      { residenceId: '123', wasteType: 'organic', amountCollected: 20 },
      { residenceId: '456', wasteType: 'recyclable', amountCollected: 10 }
    ];

    WasteCollection.find.mockResolvedValue(mockWasteRecords);

    const result = await WasteCollectionRepository.getAllWasteRecords();
    expect(result).toEqual(mockWasteRecords);
    expect(WasteCollection.find).toHaveBeenCalledTimes(1);
  });

  test('should get waste records by residence ID', async () => {
    const mockWasteRecords = [{ residenceId: '123', wasteType: 'organic', amountCollected: 20 }];

    WasteCollection.find.mockResolvedValue(mockWasteRecords);

    const result = await WasteCollectionRepository.getWasteRecordsByResidenceId('123');
    expect(result).toEqual(mockWasteRecords);
    expect(WasteCollection.find).toHaveBeenCalledWith({ residenceId: '123' });
  });

  test('should create a new waste record', async () => {
    const mockWasteRecord = { residenceId: '789', wasteType: 'hazardous', amountCollected: 5 };

    WasteCollection.prototype.save.mockResolvedValue(mockWasteRecord);

    const result = await WasteCollectionRepository.createWasteRecord(mockWasteRecord);
    expect(result).toEqual(mockWasteRecord);
  });

  test('should update a waste record by ID', async () => {
    const mockWasteRecord = { _id: '001', residenceId: '789', wasteType: 'hazardous', amountCollected: 10 };

    WasteCollection.findByIdAndUpdate.mockResolvedValue(mockWasteRecord);

    const result = await WasteCollectionRepository.updateWasteRecord('001', { amountCollected: 10 });
    expect(result).toEqual(mockWasteRecord);
    expect(WasteCollection.findByIdAndUpdate).toHaveBeenCalledWith('001', { amountCollected: 10 }, { new: true });
  });

  test('should delete a waste record by ID', async () => {
    const mockWasteRecord = { _id: '001', residenceId: '789' };

    WasteCollection.findByIdAndDelete.mockResolvedValue(mockWasteRecord);

    const result = await WasteCollectionRepository.deleteWasteRecord('001');
    expect(result).toEqual(mockWasteRecord);
    expect(WasteCollection.findByIdAndDelete).toHaveBeenCalledWith('001');
  });

  //negative test case: Handle error scenario
  test('should throw an error if getWasteRecordsByResidenceId fails', async () => {
    // Mock the find method to throw an error
    WasteCollection.find.mockRejectedValue(new Error('Database error'));

    await expect(WasteCollectionRepository.getWasteRecordsByResidenceId('999')).rejects.toThrow('Database error');
    expect(WasteCollection.find).toHaveBeenCalledWith({ residenceId: '999' });
  });

});
