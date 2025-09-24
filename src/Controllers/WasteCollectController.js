// src/Controllers/WasteCollectController.js
import WasteCollectionService from '../Services/WasteCollectionService.js';

// Default safe projection (exclude sensitive fields)
const SAFE_FIELDS = "residenceId collectionDate wasteType amountCollected collectorName";

const getAllWasteRecords = async (req, res) => {
  try {
    const { skip = 0, limit = 10 } = req.query;

    const wasteRecords = await WasteCollectionService.getAllWasteRecords(
      parseInt(skip),
      parseInt(limit),
      SAFE_FIELDS
    );

    res.status(200).json(wasteRecords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getWasteRecordsByResidenceId = async (req, res) => {
  const { residenceId } = req.params;

  try {
    const wasteRecords = await WasteCollectionService.getWasteRecordsByResidenceId(
      residenceId,
      SAFE_FIELDS
    );
    res.status(200).json(wasteRecords);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getWasteRecordById = async (req, res) => {
  const { id } = req.params;

  try {
    const wasteRecord = await WasteCollectionService.getWasteRecordById(
      id,
      SAFE_FIELDS
    );
    res.status(200).json(wasteRecord);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// No projection needed for create/update/delete (returns fresh doc or message)
const createWasteRecord = async (req, res) => {
  const { residenceId, collectionDate, wasteType, amountCollected, collectorName } = req.body;

  try {
    const newRecord = await WasteCollectionService.createWasteRecord({
      residenceId,
      collectionDate,
      wasteType,
      amountCollected,
      collectorName,
    });
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateWasteRecord = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedRecord = await WasteCollectionService.updateWasteRecord(id, updates);
    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteWasteRecord = async (req, res) => {
  const { id } = req.params;

  try {
    await WasteCollectionService.deleteWasteRecord(id);
    res.status(200).json({ message: 'Waste collection record deleted successfully.' });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export default {
  getAllWasteRecords,
  getWasteRecordsByResidenceId,
  getWasteRecordById,
  createWasteRecord,
  updateWasteRecord,
  deleteWasteRecord,
};
