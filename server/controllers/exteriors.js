import {pool} from '../config/database.js';

const getExteriors = async (req, res) => {
    try{
        const results = await pool.query('SELECT * FROM exteriors');

        res.status(200).json(results.rows);
    } catch(err){
        res.status(409).json({message: err.message});
    }
};

export default {
    getExteriors
}