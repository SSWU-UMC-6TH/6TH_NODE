// temp.route.js 라우팅-길뚫어주기 이 경로의 통신을 가능하게 함

import express from 'express';
import { tempTest } from '../controllers/temp.controller.js';
import { tempException } from '../controllers/temp.controller.js';

export const tempRouter = express.Router();

tempRouter.get('/test', tempTest);
tempRouter.get('/exception/:flag',tempException);