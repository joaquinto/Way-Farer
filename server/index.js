/* eslint-disable no-unused-vars */
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import validator from 'express-validator';
import users from './router/userRouter';
import trips from './router/tripRouter';

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(validator());

app.get('/', (req, res) => {
  res.status(200).json({ status: 'success', data: 'Welcome to WayFarer ...' });
});

app.use('/api/v1/', users);
app.use('/api/v1/', trips);

app.use('*', (req, res, next) => {
  res.status(404).json({ status: 'error', error: 'Page not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ status: 'error', error: err.message });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});


export default app;
