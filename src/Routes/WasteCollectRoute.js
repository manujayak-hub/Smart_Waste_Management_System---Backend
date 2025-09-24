// src/Routes/WasteCollectRoute.js
import express from 'express';
import WasteCollectController from '../Controllers/WasteCollectController.js'; 
import { wasteLimiter } from '../Middleware/rateLimiter.js';

const WasteCollect_Router = express.Router();

// Apply limiter only for this router
WasteCollect_Router.use(wasteLimiter);

// Get all waste collection records
WasteCollect_Router.get('/', WasteCollectController.getAllWasteRecords);

// Get waste collection records by residence/building ID
WasteCollect_Router.get('/residence/:residenceId', WasteCollectController.getWasteRecordsByResidenceId); // Adjusted path for residence ID

// Get a specific waste collection record by ID
WasteCollect_Router.get('/:id', WasteCollectController.getWasteRecordById); // New route for getting by waste record ID

// Create a new waste collection record
WasteCollect_Router.post('/create', WasteCollectController.createWasteRecord);

// Update a waste collection record by ID
WasteCollect_Router.put('/:id', WasteCollectController.updateWasteRecord);

// Delete a waste collection record by ID
WasteCollect_Router.delete('/:id', WasteCollectController.deleteWasteRecord);

export default WasteCollect_Router;
