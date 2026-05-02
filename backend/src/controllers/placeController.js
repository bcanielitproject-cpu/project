import TouristPlace from "../models/TouristPlace.js";

export async function getPlaces(req, res, next) {
  try {
    const places = await TouristPlace.find().sort({ name: 1 });
    res.json(places);
  } catch (error) {
    next(error);
  }
}

export async function getPlaceById(req, res, next) {
  try {
    const place = await TouristPlace.findById(req.params.id);

    if (!place) {
      return res.status(404).json({ message: "Tourist place not found" });
    }

    res.json(place);
  } catch (error) {
    next(error);
  }
}
