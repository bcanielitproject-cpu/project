import TouristPlace from "../models/TouristPlace.js";

export async function getPlaces(req, res, next) {
  try {
    const places = await TouristPlace.find().sort({ name: 1 });
    res.json(places);
  } catch (error) {
    next(error);
  }
}

export async function createPlace(req, res, next) {
  try {
    const { name, description, images = [], location } = req.body;

    if (!name || !description || !location?.address || !location?.district) {
      return res.status(400).json({
        message: "Name, description, location address, and location district are required"
      });
    }

    const normalizedImages = Array.isArray(images)
      ? images.filter((image) => typeof image === "string" && image.trim())
      : [];

    if (!normalizedImages.length) {
      return res.status(400).json({ message: "At least one image URL is required" });
    }

    const place = await TouristPlace.create({
      name: String(name).trim(),
      description: String(description).trim(),
      images: normalizedImages,
      location: {
        address: String(location.address).trim(),
        district: String(location.district).trim(),
        coordinates: {
          lat: location.coordinates?.lat,
          lng: location.coordinates?.lng
        }
      }
    });

    res.status(201).json(place);
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

export async function deletePlace(req, res, next) {
  try {
    const place = await TouristPlace.findByIdAndDelete(req.params.id);

    if (!place) {
      return res.status(404).json({ message: "Tourist place not found" });
    }

    res.json({ message: "Tourist place deleted" });
  } catch (error) {
    next(error);
  }
}
