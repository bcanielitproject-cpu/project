import "dotenv/config";
import { connectDB } from "./config/db.js";
import { hotels, places, restaurants } from "./data/defaultData.js";
import Hotel from "./models/Hotel.js";
import Restaurant from "./models/Restaurant.js";
import TouristPlace from "./models/TouristPlace.js";

async function seed() {
  await connectDB();
  await Promise.all([
    TouristPlace.deleteMany({}),
    Hotel.deleteMany({}),
    Restaurant.deleteMany({})
  ]);
  await Promise.all([
    TouristPlace.insertMany(places),
    Hotel.insertMany(hotels),
    Restaurant.insertMany(restaurants)
  ]);
  console.log("Seed data inserted");
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
