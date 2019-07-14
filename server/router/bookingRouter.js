import express from 'express';
import bookingController from '../controller/bookingController';
import jwtUtils from '../helpers/jwtTokenUtils';
import validator from '../middleware/validator';
import authentication from '../middleware/authentication';

const router = express.Router();
const { verifyToken } = jwtUtils;
const {
  isSeatNumberExist, hasUserBooked,
} = authentication;
const { bookingValidator, bookingIdParams } = validator;
const { createBooking, viewBookings, deleteBooking } = bookingController;

router.post('/bookings', bookingValidator, isSeatNumberExist, verifyToken, hasUserBooked, createBooking);

router.get('/bookings', verifyToken, viewBookings);

router.delete('/bookings/:id', bookingIdParams, verifyToken, deleteBooking);

export default router;
