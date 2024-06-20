import express from 'express';
import {tempTest,tempException} from '../controllers/tempController.js';

export const tempRouter = express.Router();

tempRouter.get('/test', tempTest);
//tempRouter.get('/private', test.errorTest);
tempRouter.get('/exception/:flag',tempException);