import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFound from './app/middleware/notFoundHandler';
import router from './app/routes';
const app = express();

//parsers

app.use(express.json());
app.use(cors());

// applications routes

app.use('/api/v1/', router);

const getAControllar = (req: Request, res: Response) => {
  res.send('Elite University Server is running');
};

// global error handler

app.use(globalErrorHandler);
app.use(notFound);

// test route

app.get('/', getAControllar);

export default app;
