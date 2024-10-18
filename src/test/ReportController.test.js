import { getPaymentsReport, getSchedulesReport, getWasteCollectionReport } from '../Controllers/ReportController.js'; 
//import Payment from '../Models/Payment.js'; // Adjust based on your actual model
import Schedule from '../Models/ScheduleModel.js'; 
import WasteCollected from '../Models/WasteCollectModel.js'; 

//jest.mock('../Models/Payment.js'); // Mocking the Payment model
jest.mock('../Models/ScheduleModel.js'); // Mocking the Schedule model
jest.mock('../Models/WasteCollectModel.js'); // Mocking the WasteCollected model

/*describe('ReportsController', () => {
    describe('getPaymentsReport', () => {
        it('should return payments for a given month', async () => {
            const mockPayments = [
                { _id: '1', amount: 100, date: new Date('2024-10-15') },
                { _id: '2', amount: 200, date: new Date('2024-10-20') },
            ];
            Payment.find.mockResolvedValue(mockPayments); // Mock the find method

            const req = { query: { month: '2024-10' } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

            await getPaymentsReport(req, res); // Call the controller method
            expect(res.json).toHaveBeenCalledWith(mockPayments); // Check the response
            expect(Payment.find).toHaveBeenCalledWith({
                date: { $gte: new Date('2024-10-01'), $lt: new Date('2024-10-31') },
            }); // Ensure find was called with the correct date range
        });

        it('should return an error message if fetching fails', async () => {
            Payment.find.mockRejectedValue(new Error('Database error')); // Mock the find method to throw an error

            const req = { query: { month: '2024-10' } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

            await getPaymentsReport(req, res); // Call the controller method
            expect(res.status).toHaveBeenCalledWith(500); // Check for error status
            expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching payments report', error: expect.any(Error) });
        });
    });*/

    describe('getSchedulesReport', () => {
        it('should return schedules for a given area', async () => {
            const mockSchedules = [
                { _id: '1', area: 'Downtown', time: '10:00 AM' },
                { _id: '2', area: 'Downtown', time: '12:00 PM' },
            ];
            Schedule.find.mockResolvedValue(mockSchedules); 

            const req = { query: { area: 'Downtown' } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

            await getSchedulesReport(req, res); 
            expect(res.json).toHaveBeenCalledWith(mockSchedules); 
            expect(Schedule.find).toHaveBeenCalledWith({ area: 'Downtown' }); 
        });

        it('should return an error message if fetching fails', async () => {
            Schedule.find.mockRejectedValue(new Error('Database error')); 

            const req = { query: { area: 'Downtown' } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

            await getSchedulesReport(req, res); 
            expect(res.status).toHaveBeenCalledWith(500); 
            expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching schedules report', error: expect.any(Error) });
        });
    });

    describe('getWasteCollectionReport', () => {
        it('should return waste collection data for a given month', async () => {
            const mockWasteCollected = [
                { _id: '1', wasteType: 'Plastic', amountCollected: 500 },
                { _id: '2', wasteType: 'Organic', amountCollected: 300 },
            ];
            WasteCollected.aggregate.mockResolvedValue(mockWasteCollected); 

            const req = { query: { month: 'October' } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

            await getWasteCollectionReport(req, res); 
            expect(res.json).toHaveBeenCalledWith(mockWasteCollected); 
            expect(WasteCollected.aggregate).toHaveBeenCalledWith(expect.any(Array)); 
        });

        it('should return an error message if fetching fails', async () => {
            WasteCollected.aggregate.mockRejectedValue(new Error('Database error')); 

            const req = { query: { month: 'October' } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };

            await getWasteCollectionReport(req, res); 
            expect(res.status).toHaveBeenCalledWith(500); 
            expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching waste collected report', error: expect.any(Error) });
        });
    });

