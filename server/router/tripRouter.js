import express from 'express';
import tripController from '../controller/tripController';
import authentication from '../middleware/authentication';
import validator from '../middleware/validator';
import jwtUtils from '../helpers/jwtTokenUtils';

const router = express.Router();

const { createTrip, getAllTrips, cancelTrip } = tripController;
const { verifyToken } = jwtUtils;
const { isBusExist, isTripExist } = authentication;
const { tripValidation, tripIdParams } = validator;

router.post('/trips', tripValidation, verifyToken, isBusExist, createTrip);

router.get('/trips', verifyToken, getAllTrips);

router.patch('/trips/:id', tripIdParams, isTripExist, verifyToken, cancelTrip);

export default router;
