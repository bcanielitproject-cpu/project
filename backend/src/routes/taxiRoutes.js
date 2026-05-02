import express from "express";
import { bookTaxi, cancelTaxiBooking, getMyTaxiBookings } from "../controllers/taxiController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, bookTaxi);
router.get("/mine", protect, getMyTaxiBookings);
router.delete("/:id", protect, cancelTaxiBooking);

export default router;
