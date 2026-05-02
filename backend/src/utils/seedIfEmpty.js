import { hotels, places, restaurants } from "../data/defaultData.js";
import Hotel from "../models/Hotel.js";
import Restaurant from "../models/Restaurant.js";
import TouristPlace from "../models/TouristPlace.js";
import User from "../models/User.js";

const DEFAULT_ADMIN_PHONE = process.env.ADMIN_PHONE || "0123456789";
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin@123";

async function ensureAdminAccount() {
  const existing = await User.findOne({ phone: DEFAULT_ADMIN_PHONE }).select("+password");

  if (!existing) {
    await User.create({
      phone: DEFAULT_ADMIN_PHONE,
      password: DEFAULT_ADMIN_PASSWORD,
      username: "Admin",
      role: "admin"
    });
    return;
  }

  if (existing.role !== "admin") {
    existing.role = "admin";
    await existing.save();
  }
}

export async function seedIfEmpty() {
  const writes = [
    ...places.map((place) =>
      TouristPlace.updateOne({ name: place.name }, { $setOnInsert: place }, { upsert: true })
    ),
    ...hotels.map((hotel) =>
      Hotel.updateOne({ name: hotel.name }, { $setOnInsert: hotel }, { upsert: true })
    ),
    ...restaurants.map((restaurant) =>
      Restaurant.updateOne(
        { name: restaurant.name },
        { $setOnInsert: restaurant },
        { upsert: true }
      )
    )
  ];

  await Promise.all(writes);
  await ensureAdminAccount();
  console.log("Default Nagaland tourism data checked");
}
