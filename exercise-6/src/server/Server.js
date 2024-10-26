import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

console.log('MONGO_URI:', process.env.MONGO_URI); // Add this line to check if it's loaded

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json()); 

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const trainSchema = new mongoose.Schema({
  DESTINATION: String,
  DIRECTION: String,
  EVENT_TIME: Date,
  HEAD_SIGN: String,
  LINE: String,
  NEXT_ARR: Date,
  STATION: String,
  TRAIN_ID: Number,
  WAITING_SECONDS: Number,
  WAITING_TIME: String,
  RESPONSETIMESTAMP: Date,
  VEHICLELONGITUDE: Number,
  VEHICLELATITUDE: Number,
  DELAY: String,
  TRIP_ID: Number
});

const stationSchema = new mongoose.Schema({
  line: {
    type: String,
    enum: ["red", "gold", "blue", "green"],
    required: true
  },
  stations: [{
    type: String,
    required: true
  }]
});

const Train = mongoose.model("Train", trainSchema);
const Station = mongoose.model("Station", stationSchema);

// Export schema
export { Train, Station };

app.get("/api/trains", async (req, res) => {
  const trains = await Train.find();
  res.json(trains);
});

app.get("/api/stations", async (req, res) => {
  const stations = await Station.find();
  res.json(stations);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
