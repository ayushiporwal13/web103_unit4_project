import {pool} from '../config/database.js';

const getInteriors = async (req, res) => {
    try{
        const results = await pool.query('SELECT * FROM interiors');

        res.status(200).json(results.rows);
    } catch(err){
        res.status(409).json({message: err.message});
    }
};

export default {
    getInteriors
}