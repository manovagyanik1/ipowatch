import express from 'express';
import { getIpos } from '../controllers/ipoController.js';

export const ipoRouter = express.Router();

ipoRouter.get('/', getIpos);