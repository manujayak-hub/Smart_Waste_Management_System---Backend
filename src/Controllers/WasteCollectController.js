import WasteCollection from '../Models/WasteCollectModel.js'; // Adjust the import path accordingly

// Get all waste collection records
const getAllWasteRecords = async (req, res) => {
  try {
    const wasteRecords = await WasteCollection.find();
    res.status(200).json(wasteRecords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get waste collection records by residence/building ID
const getWasteRecordsByResidenceId = async (req, res) => {
  const { residenceId } = req.params; // Extract residenceId/buildingId from the request parameters

  try {
    const wasteRecords = await WasteCollection.find({ residenceId });
    if (wasteRecords.length === 0) {
      return res.status(404).json({ message: 'No waste collection records found for this residence.' });
    }
    res.status(200).json(wasteRecords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single waste collection record by its unique ID
const getWasteRecordById = async (req, res) => {
  const { id } = req.params; // Extract the record ID from the request parameters

  try {
    const wasteRecord = await WasteCollection.findById(id);
    if (!wasteRecord) {
      return res.status(404).json({ message: 'Waste collection record not found.' });
    }
    res.status(200).json(wasteRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new waste collection record
const createWasteRecord = async (req, res) => {
  const { residenceId, collectionDate, wasteType, amountCollected, collectorName } = req.body;

  const wasteRecord = new WasteCollection({
    residenceId,     // ID of the residence or building
    collectionDate,  // Date when waste was collected
    wasteType,       // Type of waste collected (e.g., organic, recyclable, hazardous)
    amountCollected, // Amount of waste collected (could be in kg or liters)
    collectorName    // Name of the waste collection personnel
  });

  try {
    const savedWasteRecord = await wasteRecord.save();
    res.status(201).json(savedWasteRecord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a waste collection record by ID
const updateWasteRecord = async (req, res) => {
  const { id } = req.params; // Extract waste record ID from the request parameters
  const updates = req.body; // Get updates from the request body

  try {
    const updatedWasteRecord = await WasteCollection.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedWasteRecord) {
      return res.status(404).json({ message: 'Waste collection record not found.' });
    }
    res.status(200).json(updatedWasteRecord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a waste collection record by ID
const deleteWasteRecord = async (req, res) => {
  const { id } = req.params; // Extract waste record ID from the request parameters

  try {
    const deletedWasteRecord = await WasteCollection.findByIdAndDelete(id);
    if (!deletedWasteRecord) {
      return res.status(404).json({ message: 'Waste collection record not found.' });
    }
    res.status(200).json({ message: 'Waste collection record deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Exporting all functions
export default {
  getAllWasteRecords,
  getWasteRecordsByResidenceId,
  getWasteRecordById, // New function to get a record by ID
  createWasteRecord,
  updateWasteRecord,
  deleteWasteRecord
};
