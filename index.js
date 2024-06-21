// const express = require('express')   // common JS
import express from 'express'          // ES6
import bodyParser from 'body-parser';
import cors from 'cors';

import missionRoutes from './src/routes/missionRoutes.js';
import storeRoutes from './src/routes/storeRoutes.js';

const app = express()
const port = 3000

const myLogger = (req, res, next) => {
    console.log("LOGGED");
    next();
}

app.use(cors());
app.use(bodyParser.json());
app.use(myLogger);

app.get('/', (req, res) => {
    console.log("/");
    res.send('Hello UMC!');
});

app.get('/hello', (req, res) => {
    console.log("/hello");
    res.send('Hello world!');
});

app.use('/missions', missionRoutes);
app.use('/stores', storeRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
