import express from 'express';
import bookingController from '../controller/bookingController';
import jwtUtils from '../helpers/jwtTokenUtils';
import validator from '../middleware/validator';
import authentication from '../middleware/authentication';

const router = express.Router();
const { verifyToken } = jwtUtils;
const {
  isUser, isSeatNumberExist, isOwner, isSeatFullyBooked, isTripExist,
} = authentication;
const { bookingValidator, bookingIdParams } = validator;
const { createBooking, viewBookings, deleteBooking } = bookingController;
const bookingUrl = '/bookings';

router.post(`${bookingUrl}`, bookingValidator, isTripExist, isSeatFullyBooked, isSeatNumberExist, verifyToken, isUser, createBooking);

router.get(`${bookingUrl}`, verifyToken, viewBookings);

router.delete(`${bookingUrl}/:id`, bookingIdParams, verifyToken, isUser, isOwner, deleteBooking);

export default router;
