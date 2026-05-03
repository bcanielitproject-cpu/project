import cors from "cors";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import placeRoutes from "./routes/placeRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import taxiRoutes from "./routes/taxiRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

const app = express();
const allowedOrigins = [
  process.env.CLIENT_ORIGIN,
  "https://project-blue-beta-18.vercel.app",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174"
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Nagaland Tourism API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/taxis", taxiRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/restaurants", restaurantRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
