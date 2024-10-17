//import Payment from '../models/Payment'; // Adjust based on your actual model
import Schedule from '../Models/ScheduleModel.js'; // Adjust based on your actual model
//import WasteCollected from '../models/WasteCollected'; // Adjust based on your actual model

export const getPaymentsReport = async (req, res) => {
    const { month } = req.query; // Expecting month in format YYYY-MM

    try {
        const payments = await Payment.find({ date: { $gte: new Date(`${month}-01`), $lt: new Date(`${month}-31`) } });
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching payments report', error });
    }
};

export const getSchedulesReport = async (req, res) => {
    const { area } = req.query;

    try {
        const schedules = await Schedule.find({ area });
        res.json(schedules);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching schedules report', error });
    }
};

export const getWasteCollectionReport = async (req, res) => {
    const { month } = req.query;

    try {
        const wasteCollected = await WasteCollected.find({ date: { $gte: new Date(`${month}-01`), $lt: new Date(`${month}-31`) } });
        res.json(wasteCollected);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching waste collected report', error });
    }
};