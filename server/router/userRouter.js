import express from 'express';
import validator from '../middleware/validator';
import userController from '../controller/userController';
import authentication from '../middleware/authentication';

const router = express.Router();
const { isUserExist } = authentication;
const { signUpValidation } = validator;
const { signUp } = userController;

router.post('/auth/signup', signUpValidation, isUserExist, signUp);

export default router;
