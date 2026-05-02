import express from "express";
import {
  bookHotel,
  cancelHotelBooking,
  getHotels,
  getMyHotelBookings
} from "../controllers/hotelController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getHotels);
router.post("/bookings", protect, bookHotel);
router.get("/bookings/mine", protect, getMyHotelBookings);
router.delete("/bookings/:id", protect, cancelHotelBooking);

export default router;
