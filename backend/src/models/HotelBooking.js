import mongoose from "mongoose";

const hotelBookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true
    },
    bookingChoice: {
      type: String,
      required: true,
      trim: true,
      enum: ["standard-room", "deluxe-room", "family-room", "homestay-room", "custom"]
    },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
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

hotelBookingSchema.pre("validate", function validateDates(next) {
  if (this.checkIn && this.checkOut && this.checkOut <= this.checkIn) {
    return next(new Error("Check-out date must be after check-in date"));
  }

  next();
});

export default mongoose.model("HotelBooking", hotelBookingSchema);
