// src/routes/store.route.js
import express from "express";
import asyncHandler from 'express-async-handler';
import { getReview as reviewPreview } from '../providers/store.provider.js';
export const storeRouter = express.Router({mergeParams: true});

storeRouter.get('/reviews', asyncHandler(reviewPreview));