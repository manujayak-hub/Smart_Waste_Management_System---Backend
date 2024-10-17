// src/routes/ReportRoutes.js

import express from 'express';
import { getPaymentsReport ,getSchedulesReport,getWasteCollectionReport} from '../Controllers/ReportController.js';


const router = express.Router();

router.get('/payments', getPaymentsReport);

router.get('/schedules', getSchedulesReport);

router.get('/waste-collected', getWasteCollectionReport);

export default router;
