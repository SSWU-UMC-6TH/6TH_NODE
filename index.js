import express from 'express';
import bodyParser from 'body-parser';
import { missionRouter } from './src/routes/missions.route.js';
import { reviewRouter } from './src/routes/reviews.route.js';

const app = express();

app.use(bodyParser.json());

// 미션 관련 라우터
app.use('/missions', missionRouter);

// 리뷰 관련 라우터
app.use('/', reviewRouter);

//가게 관련 라우터 
app.use('/:storeId',storeRouter);
