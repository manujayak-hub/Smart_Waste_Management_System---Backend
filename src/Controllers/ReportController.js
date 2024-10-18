//import Payment from '../models/Payment'; // Adjust based on your actual model
import Schedule from '../Models/ScheduleModel.js'; // Adjust based on your actual model
import WasteCollected from '../Models/WasteCollectModel.js'; 

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

// Convert the month to a full month name using a helper function
const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1); // Month is 0-indexed in JavaScript
    return format(date, 'MMMM');  // Use 'MMMM' for the full month name (e.g., "January")
};

export const getWasteCollectionReport = async (req, res) => {
    const { month } = req.query; // Expecting month in full format like "January", "February"
    
    try {
        // Get the month number from the month name
        const date = new Date(`${month} 01, 2000`); // Temporary date to get the month number
        const monthNumber = date.getMonth() + 1;

        // Now filter based on the month and year using MongoDB's aggregation pipeline
        const wasteCollected = await WasteCollected.aggregate([
            {
                $project: {
                    residenceId: 1,
                    collectionDate: 1,
                    wasteType: 1,
                    amountCollected: 1,
                    collectorName: 1,
                    month: { $month: '$collectionDate' },  // Extract month
                    year: { $year: '$collectionDate' }    // Extract year
                }
            },
            {
                $match: {
                    month: monthNumber,  // Match month
                    year: new Date().getFullYear()  // Adjust if needed to filter by year
                }
            }
        ]);

        res.json(wasteCollected);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching waste collected report', error });
    }
};