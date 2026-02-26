// import 'dotenv/config';
import { app } from './app.js';
import { connectDB } from './config/connectDB.js';

await connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});