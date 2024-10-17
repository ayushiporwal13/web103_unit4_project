import express from 'express';
import CarsController from '../controllers/cars.js';

const router = express.Router();

router.get('/cars', CarsController.getAllCars);
router.get('/cars/:id', CarsController.getCar);
router.post('/', CarsController.createCar);
router.patch('/edit/:id', CarsController.updateCar);
router.delete('/delete/:id', CarsController.deleteCar);

export default router;