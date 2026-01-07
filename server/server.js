const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { connectDB } = require("./lib/db");
const cors = require("cors");
// Load env from repo root first (monorepo best practice)
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
// Fallback: allow a local server/.env for standalone server runs
require("dotenv").config();

const app = express();

// Basic env validation to surface misconfiguration early
const requiredEnv = ["MONGODB_URI", "JWT_SECRET"];
const missingEnv = requiredEnv.filter((k) => !process.env[k]);
if (missingEnv.length) {
  console.warn(
    `Missing required environment variables: ${missingEnv.join(
      ", "
    )}. Some features may fail.`
  );
}

// Import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const categoryRoutes = require("./routes/categories");
const orderRoutes = require("./routes/orders");
const settingsRoutes = require("./routes/settings");
const contactRoutes = require("./routes/contact");

// Import middleware
const errorHandler = require("./middleware/errorHandler");

// Security middleware and rate limiting removed for serverless compatibility

// CORS: allow all origins (serverless + same-origin under Vercel)
app.use(cors({ origin: true, credentials: true }));

// Body parser middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Serve uploaded files statically under /api/uploads (required for Vercel serverless)
app.use(
  "/api/uploads",
  (req, res, next) => {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
  },
  express.static(path.join(__dirname, "uploads"))
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/contact", contactRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is running!",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler (Express 5 compatible: no '*' wildcard)
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: `Route ${req.originalUrl} not found`,
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Error handling for uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  console.error("Stack:", err.stack);
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

// Database connection
if (require.main === module) {
  (async () => {
    try {
      await connectDB();
      const PORT = process.env.PORT || 5000;
      const server = app.listen(PORT, "0.0.0.0", () => {
        console.log(
          `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
        );
        console.log(`Health endpoint: http://localhost:${PORT}/api/health`);
        console.log(`API base URL: http://localhost:${PORT}/api`);
      });
      server.on("error", (err) => {
        console.error("Server error:", err);
      });
    } catch (err) {
      console.error("Startup error:", err);
      process.exit(1);
    }
  })();
}

module.exports = app;
