import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["hotel", "homestay"],
      default: "hotel"
    },
    description: { type: String, required: true },
    images: [{ type: String }],
    location: { type: String, required: true },
    pricePerNight: { type: Number, required: true, min: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Hotel", hotelSchema);
