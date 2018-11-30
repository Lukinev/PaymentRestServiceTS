import express from 'express';
import { conf } from '../config';

export const api_router = express.Router();

api_router.all('/', require('./' + conf.version + '/index'));
api_router.all('/account/*', require('./' + conf.version + '/account'));
api_router.all('/payment/*', require('./' + conf.version + '/payment'));
api_router.all('/heatmeter/*', require('./' + conf.version + '/heatmeter'));