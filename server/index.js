/* eslint-disable no-unused-vars */
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import validator from 'express-validator';
import users from './router/userRouter';

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(validator());

app.get('/', (req, res, next) => {
  res.status(200).json({ status: 200, message: 'Welcome to WayFarer ...' });
});

app.use('/api/v1/', users);

app.all('*', (req, res, next) => {
  res.status(404).json({ status: 404, error: 'Page not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ status: 500, error: err.message });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});


export default app;
