import express from 'express';
import cookieParser from 'cookie-parser';
import { authRouter } from './routes/auth.routes.js';
import { globalErrorHandler } from './middleware/error.middleware.js';
import { accountRouter } from './routes/accounts.routes.js';
import { tagRouter } from './routes/tags.routes.js';
import { transactionRouter } from './routes/transactions.routes.js';
import { getHealthController } from './controllers/health.js';
import { connectDB } from './config/connectDB.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use( async(_, __, next)=>{
  await connectDB();
  next();
});

app.use('/api/auth', authRouter);
app.use('/api/accounts', accountRouter);
app.use('/api/tags', tagRouter);
app.use('/api/transactions', transactionRouter);

app.use(globalErrorHandler);

app.get("/api/health", getHealthController);

app.all("/*path", (req, res) => res.status(404).json({ message: "Not Found" }));

export default app;