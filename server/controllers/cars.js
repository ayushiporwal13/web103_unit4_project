import {pool} from '../config/database.js';

const getAllCars = async (req, res) => {
    try{
        const results = await pool.query('SELECT * FROM cars');
        res.status(200).json(results.rows);
    } catch(err){
        res.status(409).json({message: err.message});
    }
};

const getCar = async (req, res) => {
    try{
        const id = Number(req.params.id);
        // console.log('id', id);
        const results = await pool.query('SELECT * FROM cars WHERE id = $1', [id]);

        res.status(200).json(results.rows[0]);
    } catch (err){
        res.status(409).json({message: err.message});
    }
};

const createCar = async (req, res ) => {
    try{
        const {name, isconvertible, exterior, roof, wheels, interior, price } = req.body;
        const query = 'INSERT INTO cars (name, isconvertible, exterior, roof, wheels, interior, price) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        const values = [name, isconvertible, exterior, roof, wheels, interior, price];

        const results = await pool.query(query, values);

        res.status(201).json(results.rows);

    } catch(err){
        res.status(409).json({message: err.message});
    }
};

const updateCar = async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const {name, isconvertible, exterior, roof, wheels, interior, price } = req.body;
        const results = await pool.query(
            'UPDATE cars SET name = $1, isconvertible = $2, exterior = $3, roof = $4, wheels = $5, interior = $6, price = $7 WHERE id = $8 RETURNING *',
            [name, isconvertible, exterior, roof, wheels, interior, price, id]
        );

        res.status(200).json(results.rows[0]);

    } catch(err){
        res.status(409).json({message: err.message});
    }
};

const deleteCar = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const results = await pool.query('DELETE FROM cars WHERE id = $1', [id]);

        res.status(200).json(results.rows[0]);
    } catch(err){
        res.status(409).json({message: err.message});
    }
};

export default {
    getAllCars ,getCar, createCar, updateCar, deleteCar
}