const mongoose = require("mongoose");

let isConnecting = false;

async function connectDB() {
  if (!process.env.MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is not set. Create server/.env from server/.env.example or configure env vars in your deployment platform."
    );
  }
  if (
    mongoose.connection.readyState === 1 ||
    mongoose.connection.readyState === 2
  ) {
    return;
  }
  if (isConnecting) return;
  isConnecting = true;
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  } finally {
    isConnecting = false;
  }
}

module.exports = { connectDB };
