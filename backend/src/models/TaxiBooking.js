import mongoose from "mongoose";

const taxiBookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    bookingChoice: {
      type: String,
      required: true,
      trim: true,
      enum: ["bike", "four-seater", "six-seater", "custom"]
    },
    pickup: { type: String, required: true, trim: true },
    drop: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^[0-9]{10,15}$/, "Phone number must contain 10 to 15 digits"]
    },
    paymentMethod: {
      type: String,
      enum: ["COD"],
      default: "COD"
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "expired"],
      default: "pending"
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 60 * 60 * 1000),
      index: { expires: 0 }
    }
  },
  { timestamps: true }
);

export default mongoose.model("TaxiBooking", taxiBookingSchema);
