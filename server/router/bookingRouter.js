import express from 'express';
import bookingController from '../controller/bookingController';
import jwtUtils from '../helpers/jwtTokenUtils';
import validator from '../middleware/validator';
import authentication from '../middleware/authentication';

const router = express.Router();
const { verifyToken } = jwtUtils;
const {
  isUser, isSeatNumberExist, hasUserBooked, isOwner,
} = authentication;
const { bookingValidator, bookingIdParams } = validator;
const { createBooking, viewBookings, deleteBooking } = bookingController;

router.post('/bookings', bookingValidator, isSeatNumberExist, verifyToken, isUser, hasUserBooked, createBooking);

router.get('/bookings', verifyToken, viewBookings);

router.delete('/bookings/:id', bookingIdParams, verifyToken, isUser, isOwner, deleteBooking);

export default router;
