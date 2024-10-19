import UserPayment from '../Models/UserPayementModel.js';
import Schedule from '../Models/ScheduleModel.js';
import WasteCollected from '../Models/WasteCollectModel.js';

const getMonthNumber = (monthName) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return monthNames.indexOf(monthName) + 1;
};

export const getUserPaymentReport = async (req, res) => {
  const { month } = req.query;
  try {
    const monthNumber = getMonthNumber(month);
    if (monthNumber === 0) {
      return res.status(400).json({ message: 'Invalid month name' });
    }

    const monthRegex = new RegExp(`^\\d{4}/${monthNumber.toString().padStart(2, '0')}`);
    const payments = await UserPayment.find({
      createdAt: { $regex: monthRegex }
    });

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user payments report', error });
  }
};

export const getSchedulesReport = async (req, res) => {
  const { area } = req.query;
  console.log('Fetching schedules for area:', area); // Debug log
  if (!area) {
    return res.status(400).json({ message: 'Area is required' }); // Handle missing area
  }
  
  try {
    const schedules = await Schedule.find({ area });
    console.log('Schedules found:', schedules); // Debug log
    res.status(200).json(schedules);
  } catch (error) {
    console.error('Error fetching schedules:', error); // Log error details
    res.status(500).json({ message: 'Error fetching schedules report', error });
  }
};

export const getWasteCollectionReport = async (req, res) => {
  const { month } = req.query;
  try {
    // Ensure the month is valid
    const validMonths = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    if (!validMonths.includes(month)) {
      return res.status(400).json({ message: 'Invalid month name' });
    }

    const monthNumber = validMonths.indexOf(month) + 1;

    const wasteCollected = await WasteCollected.aggregate([
      {
        $project: {
          residenceId: 1,
          collectionDate: 1,
          wasteType: 1,
          amountCollected: 1,
          collectorName: 1,
          month: { $month: '$collectionDate' },
          year: { $year: '$collectionDate' }
        }
      },
      {
        $match: {
          month: monthNumber,
          year: new Date().getFullYear()
        }
      }
    ]);

    res.status(200).json(wasteCollected);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching waste collected report', error });
  }
};
