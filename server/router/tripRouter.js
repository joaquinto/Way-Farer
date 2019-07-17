import express from 'express';
import tripController from '../controller/tripController';
import authentication from '../middleware/authentication';
import validator from '../middleware/validator';
import jwtUtils from '../helpers/jwtTokenUtils';

const router = express.Router();

const { createTrip, getAllTrips, cancelTrip } = tripController;
const { verifyToken } = jwtUtils;
const { isAdmin, isBusExist, isTripExist } = authentication;
const { tripValidation, tripIdParams, viewTrips } = validator;

router.post('/trips', tripValidation, verifyToken, isAdmin, isBusExist, createTrip);

router.get('/trips', viewTrips, verifyToken, getAllTrips);

router.patch('/trips/:id', tripIdParams, isTripExist, verifyToken, isAdmin, cancelTrip);

export default router;
