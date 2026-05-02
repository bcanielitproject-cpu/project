import express from "express";
import {
  addRestaurantReview,
  getRestaurants
} from "../controllers/restaurantController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getRestaurants);
router.post("/:id/reviews", protect, addRestaurantReview);

export default router;
