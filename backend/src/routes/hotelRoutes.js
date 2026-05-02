import express from "express";
import {
  bookHotel,
  cancelHotelBooking,
  createHotel,
  deleteHotel,
  getHotels,
  getMyHotelBookings
} from "../controllers/hotelController.js";
import { protect, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getHotels);
router.post("/", protect, requireAdmin, createHotel);
router.post("/bookings", protect, bookHotel);
router.get("/bookings/mine", protect, getMyHotelBookings);
router.delete("/bookings/:id", protect, cancelHotelBooking);
router.delete("/:id", protect, requireAdmin, deleteHotel);

export default router;
