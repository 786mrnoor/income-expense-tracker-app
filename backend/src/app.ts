import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authRouter } from './routes/auth.routes.js';
import { globalErrorHandler } from './middleware/error.middleware.js';
import { accountRouter } from './routes/accounts.routes.js';
import { tagRouter } from './routes/tags.routes.js';

export const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/accounts', accountRouter);
app.use('/api/tags', tagRouter);

app.use(globalErrorHandler);