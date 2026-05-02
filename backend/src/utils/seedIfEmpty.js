import { hotels, places, restaurants } from "../data/defaultData.js";
import Hotel from "../models/Hotel.js";
import Restaurant from "../models/Restaurant.js";
import TouristPlace from "../models/TouristPlace.js";

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
  console.log("Default Nagaland tourism data checked");
}
