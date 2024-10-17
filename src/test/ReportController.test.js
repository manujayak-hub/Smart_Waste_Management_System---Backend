import request from 'supertest';
import express from 'express';
//import Payment from '../Models/PaymentModel.js'; // Adjust path as necessary
import Schedule from '../Models/ScheduleModel.js'; // Adjust path as necessary
//import WasteCollected from '../Models/WasteCollectedModel.js'; // Adjust path as necessary
import {
    getPaymentsReport,
    getSchedulesReport,
    getWasteCollectionReport
} from '../Controllers/ReportController.js'; // Adjust path as necessary

const app = express();
app.use(express.json());

// Mock the model methods
//jest.mock('../Models/PaymentModel.js');
jest.mock('../Models/ScheduleModel.js');
//jest.mock('../Models/WasteCollectedModel.js');

app.get('/reports/payments', getPaymentsReport);
app.get('/reports/schedules', getSchedulesReport);
app.get('/reports/waste-collected', getWasteCollectionReport);

describe('Report Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Test for getting payments report
    describe('GET /reports/payments', () => {
        it('should return payments for the specified month', async () => {
            const mockPayments = [
                { amount: 100, date: new Date('2024-10-15'), userId: 'user1' },
                { amount: 150, date: new Date('2024-10-20'), userId: 'user2' }
            ];
            Payment.find.mockResolvedValue(mockPayments);

            const response = await request(app).get('/reports/payments?month=2024-10');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockPayments);
        });

        it('should return an error if fetching payments fails', async () => {
            Payment.find.mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/reports/payments?month=2024-10');

            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('message', 'Error fetching payments report');
        });
    });

    // Test for getting schedules report
    describe('GET /reports/schedules', () => {
        it('should return schedules for the specified area', async () => {
            const mockSchedules = [
                { area: 'Area 1', time: '10:00 AM', userId: 'user1' },
                { area: 'Area 2', time: '11:00 AM', userId: 'user2' }
            ];
            Schedule.find.mockResolvedValue(mockSchedules);

            const response = await request(app).get('/reports/schedules?area=Area 1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockSchedules);
        });

        it('should return an error if fetching schedules fails', async () => {
            Schedule.find.mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/reports/schedules?area=Area 1');

            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('message', 'Error fetching schedules report');
        });
    });

    // Test for getting waste collection report
    describe('GET /reports/waste-collected', () => {
        it('should return waste collected for the specified month', async () => {
            const mockWasteCollected = [
                { amount: 200, date: new Date('2024-10-15'), userId: 'user1' },
                { amount: 250, date: new Date('2024-10-20'), userId: 'user2' }
            ];
            WasteCollected.find.mockResolvedValue(mockWasteCollected);

            const response = await request(app).get('/reports/waste-collected?month=2024-10');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockWasteCollected);
        });

        it('should return an error if fetching waste collected fails', async () => {
            WasteCollected.find.mockRejectedValue(new Error('Database error'));

            const response = await request(app).get('/reports/waste-collected?month=2024-10');

            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('message', 'Error fetching waste collected report');
        });
    });
});
