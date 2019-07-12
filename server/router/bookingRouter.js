import express from 'express';
import bookingController from '../controller/bookingController';
import jwtUtils from '../helpers/jwtTokenUtils';
import validator from '../middleware/validator';
import authentication from '../middleware/authentication';

const router = express.Router();
const { verifyToken } = jwtUtils;
const { isUser, isSeatNumberExist, hasUserBooked } = authentication;
const { bookingValidator } = validator;
const { createBooking } = bookingController;

router.post('/bookings', bookingValidator, isSeatNumberExist, verifyToken, isUser, hasUserBooked, createBooking);

export default router;
