import {pool} from '../config/database.js';

const getWheels = async (req, res) => {
    try{
        const results = await pool.query('SELECT * FROM wheels');

        res.status(200).json(results.rows);
    }
    catch(err){
        res.status(409).json({message: err.message});
    }
};

export default {
    getWheels
}