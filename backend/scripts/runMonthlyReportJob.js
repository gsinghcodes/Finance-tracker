import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { generateMonthlyReportsForAllUsers } from '../services/monthlyReportJob.js';
import connectToMongo from '../dbcon.js';

dotenv.config();

async function main() {
  await connectToMongo(process.env.MONGO_URI);
  await generateMonthlyReportsForAllUsers();
  console.log('Monthly reports generated.');
  process.exit(0);
}

main();
