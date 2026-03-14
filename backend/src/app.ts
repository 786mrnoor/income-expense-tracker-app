import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authRouter } from './routes/auth.routes.js';
import { globalErrorHandler } from './middleware/error.middleware.js';
import { accountRouter } from './routes/accounts.routes.js';
import { tagRouter } from './routes/tags.routes.js';
import { transactionRouter } from './routes/transactions.routes.js';

export const app = express();

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS!.split(',');
app.use(cors({
  origin: ALLOWED_ORIGINS,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/accounts', accountRouter);
app.use('/api/tags', tagRouter);
app.use('/api/transactions', transactionRouter);

app.use(globalErrorHandler);