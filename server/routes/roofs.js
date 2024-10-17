import express from 'express';
import RoofsController from '../controllers/roofs.js';

const router = express.Router();
router.get('/roofs', RoofsController.getRoofs);

export default router;