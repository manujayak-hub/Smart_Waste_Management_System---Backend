import UserPayment from '../Models/UserPayementModel.js';
import Schedule from '../Models/ScheduleModel.js'; // Adjust based on your actual model
import WasteCollected from '../Models/WasteCollectModel.js'; 

// Convert month name to month number
const getMonthNumber = (monthName) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames.indexOf(monthName) + 1;
  };
  
  // Fetch payment report by month name (e.g., "October")
  export const getUserPaymentReport = async (req, res) => {
    const { month } = req.query; // Expecting full month name (e.g., "October")
  
    try {
      // Convert month name to month number
      const monthNumber = getMonthNumber(month);
  
      if (monthNumber === 0) {
        return res.status(400).json({ message: 'Invalid month name' });
      }
  
      // Create a regex pattern to match the month in the "YYYY/MM/DD" format
      const monthRegex = new RegExp(`^\\d{4}/${monthNumber.toString().padStart(2, '0')}`);
  
      // Find payments where the createdAt field matches the given month
      const payments = await UserPayment.find({
        createdAt: { $regex: monthRegex }
      });
  
      res.json(payments);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user payments report', error });
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