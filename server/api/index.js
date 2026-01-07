// Vercel Serverless Function entrypoint.
// Important: do NOT connect to the DB at module-import time.
// Instead, connect per-request (handles cold starts safely) and return
// a helpful JSON error when env vars are missing.
const serverless = require("serverless-http");

const app = require("../server");
const { connectDB } = require("../lib/db");

const handler = serverless(app);

module.exports = async (req, res) => {
  try {
    await connectDB();
  } catch (err) {
    console.error("DB connect failed:", err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    return res.end(
      JSON.stringify({
        status: "error",
        message:
          "Server misconfigured: database connection failed. Set MONGODB_URI in Vercel project environment variables.",
      })
    );
  }

  try {
    return await handler(req, res);
  } catch (err) {
    console.error("Handler error:", err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    return res.end(
      JSON.stringify({ status: "error", message: "Internal Server Error" })
    );
  }
};
