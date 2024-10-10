import mongoose from 'mongoose';
import fs from 'fs/promises';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import { Train, Station } from './api.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function populateDB() {
  try {
    const trainDataPath = path.join(__dirname, '..', '..', 'trainData.json');
    const stationDataPath = path.join(__dirname, '..', '..', 'stationData.json');

    const trainData = JSON.parse(await fs.readFile(trainDataPath, 'utf8'));
    const stationData = JSON.parse(await fs.readFile(stationDataPath, 'utf8'));

    // Clear existing data
    await Train.deleteMany({});
    await Station.deleteMany({});

    // Insert train data
    await Train.insertMany(trainData.RailArrivals);

    // Insert station data
    for (const [line, stations] of Object.entries(stationData)) {
      await Station.create({ line, stations });
    }

    console.log('Database populated successfully');
  } catch (error) {
    console.error('Error populating database:', error);
  } finally {
    await mongoose.connection.close();
  }
}

populateDB();
