import express from 'express';
import validator from '../middleware/validator';
import userController from '../controller/userController';
import authentication from '../middleware/authentication';

const router = express.Router();
const { isUserExist, notAUser } = authentication;
const { signUpValidation, signInValidation } = validator;
const { signUp, signIn } = userController;

router.post('/auth/signup', signUpValidation, isUserExist, signUp);

router.post('/auth/signin', signInValidation, notAUser, signIn);

export default router;
