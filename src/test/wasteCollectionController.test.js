import WasteCollectionController from '../Controllers/WasteCollectController.js';
import WasteCollectionService from '../Services/WasteCollectionService.js'; // Mock this

jest.mock('../Services/WasteCollectionService.js'); // Mock the service

describe('WasteCollectionController', () => {
  let req, res;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks(); // Clear any mock data between tests
  });

  // Test for getAllWasteRecords
  test('should get all waste records', async () => {
    const mockWasteRecords = [
      { residenceId: '123', wasteType: 'organic', amountCollected: 20 },
      { residenceId: '456', wasteType: 'recyclable', amountCollected: 10 },
    ];

    WasteCollectionService.getAllWasteRecords.mockResolvedValue(mockWasteRecords);

    await WasteCollectionController.getAllWasteRecords(req, res);
    
    expect(WasteCollectionService.getAllWasteRecords).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockWasteRecords);
  });

  // Test for getWasteRecordsByResidenceId
  test('should get waste records by residence ID', async () => {
    const mockWasteRecords = [{ residenceId: '123', wasteType: 'organic', amountCollected: 20 }];
    req.params.residenceId = '123';

    WasteCollectionService.getWasteRecordsByResidenceId.mockResolvedValue(mockWasteRecords);

    await WasteCollectionController.getWasteRecordsByResidenceId(req, res);

    expect(WasteCollectionService.getWasteRecordsByResidenceId).toHaveBeenCalledWith('123');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockWasteRecords);
  });

  // Test for getWasteRecordById
  test('should get a waste record by ID', async () => {
    const mockWasteRecord = { _id: '001', residenceId: '123', wasteType: 'organic', amountCollected: 20 };
    req.params.id = '001';

    WasteCollectionService.getWasteRecordById.mockResolvedValue(mockWasteRecord);

    await WasteCollectionController.getWasteRecordById(req, res);

    expect(WasteCollectionService.getWasteRecordById).toHaveBeenCalledWith('001');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockWasteRecord);
  });

  // Test for createWasteRecord
  test('should create a new waste record', async () => {
    const mockWasteRecord = { residenceId: '789', wasteType: 'hazardous', amountCollected: 5 };
    req.body = { residenceId: '789', wasteType: 'hazardous', amountCollected: 5 };

    WasteCollectionService.createWasteRecord.mockResolvedValue(mockWasteRecord);

    await WasteCollectionController.createWasteRecord(req, res);

    expect(WasteCollectionService.createWasteRecord).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockWasteRecord);
  });

  // Test for updateWasteRecord
  test('should update a waste record by ID', async () => {
    const mockUpdatedRecord = { _id: '001', residenceId: '789', wasteType: 'hazardous', amountCollected: 10 };
    req.params.id = '001';
    req.body = { amountCollected: 10 };

    WasteCollectionService.updateWasteRecord.mockResolvedValue(mockUpdatedRecord);

    await WasteCollectionController.updateWasteRecord(req, res);

    expect(WasteCollectionService.updateWasteRecord).toHaveBeenCalledWith('001', req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUpdatedRecord);
  });

  // Test for deleteWasteRecord
  test('should delete a waste record by ID', async () => {
    req.params.id = '001';

    WasteCollectionService.deleteWasteRecord.mockResolvedValue();

    await WasteCollectionController.deleteWasteRecord(req, res);

    expect(WasteCollectionService.deleteWasteRecord).toHaveBeenCalledWith('001');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Waste collection record deleted successfully.' });
  });
});
