import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import dotenv from 'dotenv'
import cors from 'cors'

// import the router from your routes file
import carRouter from './routes/cars.js';
import exteriorRouter from './routes/exteriors.js';
import interiorRouter from './routes/interiors.js';
import roofRouter from './routes/roofs.js';
import wheelRouter from './routes/wheels.js';

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors());
app.use(express.json());
app.use('/api', carRouter);
app.use('/api', exteriorRouter);
app.use('/api', interiorRouter);
app.use('/api', roofRouter);
app.use('/api', wheelRouter);

if (process.env.NODE_ENV === 'development') {
    app.use(favicon(path.resolve('../', 'client', 'public', 'lightning.png')))
}
else if (process.env.NODE_ENV === 'production') {
    app.use(favicon(path.resolve('public', 'lightning.png')))
    app.use(express.static('public'))
}

// specify the api path for the server to use


if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve('public', 'index.html'))
    )
}

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})