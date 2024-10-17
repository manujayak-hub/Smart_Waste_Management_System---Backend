import WasteCollectionService from '../Services/WasteCollectionService.js';
import WasteCollectionRepository from '../Repositories/WasteCollectionRepository.js';

jest.mock('../Repositories/WasteCollectionRepository.js'); // Mock the repository

describe('WasteCollectionService', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should get all waste records', async () => {
    const mockWasteRecords = [
      { residenceId: '123', wasteType: 'organic', amountCollected: 20 },
      { residenceId: '456', wasteType: 'recyclable', amountCollected: 10 }
    ];
    
    WasteCollectionRepository.getAllWasteRecords.mockResolvedValue(mockWasteRecords);
    
    const result = await WasteCollectionService.getAllWasteRecords();
    expect(result).toEqual(mockWasteRecords);
    expect(WasteCollectionRepository.getAllWasteRecords).toHaveBeenCalledTimes(1);
  });

  test('should get waste records by residence ID', async () => {
    const mockWasteRecords = [{ residenceId: '123', wasteType: 'organic', amountCollected: 20 }];
    
    WasteCollectionRepository.getWasteRecordsByResidenceId.mockResolvedValue(mockWasteRecords);
    
    const result = await WasteCollectionService.getWasteRecordsByResidenceId('123');
    expect(result).toEqual(mockWasteRecords);
    expect(WasteCollectionRepository.getWasteRecordsByResidenceId).toHaveBeenCalledWith('123');
  });

  test('should throw an error if no records found by residence ID', async () => {
    WasteCollectionRepository.getWasteRecordsByResidenceId.mockResolvedValue([]);
    
    await expect(WasteCollectionService.getWasteRecordsByResidenceId('123')).rejects.toThrow('No waste collection records found for this residence.');
  });

  test('should create a new waste record', async () => {
    const mockWasteRecord = { residenceId: '789', wasteType: 'hazardous', amountCollected: 5 };
    
    WasteCollectionRepository.createWasteRecord.mockResolvedValue(mockWasteRecord);
    
    const result = await WasteCollectionService.createWasteRecord(mockWasteRecord);
    expect(result).toEqual(mockWasteRecord);
  });

  test('should update a waste record by ID', async () => {
    const mockWasteRecord = { _id: '001', residenceId: '789', wasteType: 'hazardous', amountCollected: 10 };
    
    WasteCollectionRepository.updateWasteRecord.mockResolvedValue(mockWasteRecord);
    
    const result = await WasteCollectionService.updateWasteRecord('001', { amountCollected: 10 });
    expect(result).toEqual(mockWasteRecord);
  });

  test('should delete a waste record by ID', async () => {
    const mockWasteRecord = { _id: '001', residenceId: '789' };
    
    WasteCollectionRepository.deleteWasteRecord.mockResolvedValue(mockWasteRecord);
    
    const result = await WasteCollectionService.deleteWasteRecord('001');
    expect(result).toEqual(mockWasteRecord);
  });

});
