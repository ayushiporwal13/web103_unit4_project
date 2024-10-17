import express from 'express';
import ExteriorsController from '../controllers/exteriors.js';

const router = express.Router();
router.get('/exteriors', ExteriorsController.getExteriors);

export default router;