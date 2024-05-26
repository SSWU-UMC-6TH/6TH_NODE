// index.js

import express from 'express';
import { tempRouter } from './src/routes/temp.route.js';
import { response } from './config/response.js';

const app = express();
const port = 3000;

// router setting
app.use('/temp', tempRouter);

// index.js

app.use((req, res, next) => {
    const err = new BaseError(status.NOT_FOUND);
    next(err);
});

app.use((err, req, res, next) => {
    const statusCode = err.data ? err.data.status : 500; // `data`가 없는 경우 500으로 처리
    const responseMessage = err.data ? response(err.data) : response(status.INTERNAL_SERVER_ERROR);
    
    res.locals.message = err.message;   
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(statusCode).send(responseMessage);
});
app.listen(port, () => {
		console.log(`Example app listening on port ${port}`);
});