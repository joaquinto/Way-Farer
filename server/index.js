/* eslint-disable no-unused-vars */
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import validator from 'express-validator';
import swaggerUi from 'swagger-ui-express';
import users from './router/userRouter';
import trips from './router/tripRouter';
import bookings from './router/bookingRouter';
import swaggerSpec from './configuration/swagger';
import responseHelper from './helpers/responseHelper';
import status from './helpers/status';
import errorHelpers from './helpers/errorHelpers';

dotenv.config();

const app = express();

const port = process.env.PORT;

const appUrl = '/api/v1/';

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(validator());

app.get('/', (req, res) => {
  res.status(200).json({ status: 'success', data: 'Welcome to WayFarer ...' });
});

app.use(`${appUrl}`, users);
app.use(`${appUrl}`, trips);
app.use(`${appUrl}`, bookings);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('*', (req, res, next) => {
  responseHelper.responseError(res, status.notFound, errorHelpers.pageNotFound);
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});


export default app;
