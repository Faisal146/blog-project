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

app.use('/api/', router);

const getAControllar = (req: Request, res: Response) => {
  res.send('Blog project Server is running');
};

// not found route
app.use(notFound);

// test route

app.get('/', getAControllar);

// global error handler

app.use(globalErrorHandler as any);

export default app;
