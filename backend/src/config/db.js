import mongoose from "mongoose";

export async function connectDB() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is required");
  }

  try {
    const connection = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 15000
    });

    console.log(`MongoDB connected: ${connection.connection.name}`);
  } catch (error) {
    if (error.message.includes("querySrv")) {
      throw new Error(
        "MongoDB Atlas DNS lookup failed. Try a different network, disable VPN/proxy, or set DNS_SERVERS=1.1.1.1,8.8.8.8 in backend/.env. If it still fails, use Atlas' standard connection string instead of mongodb+srv."
      );
    }

    if (error.message.includes("Could not connect to any servers")) {
      throw new Error(
        "MongoDB Atlas rejected the connection. Add your current IP address in Atlas > Network Access, then restart the backend."
      );
    }

    throw error;
  }
}
