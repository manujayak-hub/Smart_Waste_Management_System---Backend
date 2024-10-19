import { getUserPaymentReport, getSchedulesReport, getWasteCollectionReport } from '../Controllers/ReportController.js';
import UserPayment from '../Models/UserPayementModel.js';
import Schedule from '../Models/ScheduleModel.js';
import WasteCollected from '../Models/WasteCollectModel.js';

// Mock Mongoose model methods
jest.mock('../Models/UserPayementModel.js');
jest.mock('../Models/ScheduleModel.js');
jest.mock('../Models/WasteCollectModel.js');

// Mock request and response objects
const mockReqRes = () => {
  const req = {
    query: {}
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };
  return { req, res };
};

describe('Report Controllers', () => {

  // Test for getUserPaymentReport
  test('should return payment report for valid month', async () => {
    const { req, res } = mockReqRes();
    req.query.month = 'October';

    const payments = [{ _id: 'payment1', totalAmount: 100, createdAt: '2023/10/01' }];
    UserPayment.find.mockResolvedValue(payments);

    await getUserPaymentReport(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(payments);
  });

  test('should return 400 for invalid month in getUserPaymentReport', async () => {
    const { req, res } = mockReqRes();
    req.query.month = 'InvalidMonth';

    await getUserPaymentReport(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid month name' });
  });

  // Test for getSchedulesReport
  test('should return schedules for a valid area', async () => {
    const { req, res } = mockReqRes();
    req.query.area = 'Downtown';

    const schedules = [{ _id: 'schedule1', area: 'Downtown' }];
    Schedule.find.mockResolvedValue(schedules);

    await getSchedulesReport(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(schedules);
  });

  test('should return 400 if area is not provided in getSchedulesReport', async () => {
    const { req, res } = mockReqRes();

    await getSchedulesReport(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Area is required' });
  });

  test('should return 500 if there is an error fetching schedules', async () => {
    const { req, res } = mockReqRes();
    req.query.area = 'Downtown';
    Schedule.find.mockRejectedValue(new Error('Database error'));

    await getSchedulesReport(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching schedules report', error: expect.any(Error) });
  });

  // Test for getWasteCollectionReport
  test('should return waste collection report for a valid month', async () => {
    const { req, res } = mockReqRes();
    req.query.month = 'October';

    const wasteCollected = [{ _id: 'waste1', amountCollected: 50 }];
    WasteCollected.aggregate.mockResolvedValue(wasteCollected);

    await getWasteCollectionReport(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(wasteCollected);
  });

  test('should return 400 for invalid month in getWasteCollectionReport', async () => {
    const { req, res } = mockReqRes();
    req.query.month = 'InvalidMonth';  // Invalid month name
  
    await getWasteCollectionReport(req, res);
  
    expect(res.status).toHaveBeenCalledWith(400);  // Expect a 400 response
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid month name' });
  });
  
  test('should return 500 if there is an error fetching waste collection report', async () => {
    const { req, res } = mockReqRes();
    req.query.month = 'October';
    WasteCollected.aggregate.mockRejectedValue(new Error('Database error'));

    await getWasteCollectionReport(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching waste collected report', error: expect.any(Error) });
  });

});
