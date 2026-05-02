import express from "express";
import {
  createPlace,
  deletePlace,
  getPlaceById,
  getPlaces
} from "../controllers/placeController.js";
import { protect, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPlaces);
router.get("/:id", getPlaceById);
router.post("/", protect, requireAdmin, createPlace);
router.delete("/:id", protect, requireAdmin, deletePlace);

export default router;
