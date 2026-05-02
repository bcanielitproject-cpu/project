import mongoose from "mongoose";

const touristPlaceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
    location: {
      address: { type: String, required: true },
      district: { type: String, required: true },
      coordinates: {
        lat: Number,
        lng: Number
      }
    }
  },
  { timestamps: true }
);

export default mongoose.model("TouristPlace", touristPlaceSchema);
