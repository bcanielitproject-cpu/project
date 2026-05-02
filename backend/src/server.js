import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { configureDns } from "./config/dns.js";
import { seedIfEmpty } from "./utils/seedIfEmpty.js";

const PORT = process.env.PORT || 5000;
configureDns();

const startServer = async () => {
  try {
    await connectDB();
    await seedIfEmpty();

    app.listen(PORT, () => {
      console.log(`API running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
