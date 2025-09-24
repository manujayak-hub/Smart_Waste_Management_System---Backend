// src/Models/WasteCollectModel.js
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const wasteCollectionSchema = new Schema({
  residenceId: {
    type: String,   // ID of the residence or building
    required: true,
  },
  collectionDate: {
    type: Date,     // Date when waste was collected
    required: true,
  },
  wasteType: {
    type: String,   // Type of waste (e.g., organic, recyclable, hazardous)
    required: true,
  },
  amountCollected: {
    type: Number,   // Amount of waste collected (kg or liters)
    required: true,
  },
  collectorName: {
    type: String,   // Name of the person who collected the waste
    required: true,
  }
}, { timestamps: true });   // Automatically adds createdAt and updatedAt fields

export default mongoose.model('WasteCollection', wasteCollectionSchema);
