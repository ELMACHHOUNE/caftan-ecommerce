const serverless = require("serverless-http");
const app = require("../server/server");
const { connectDB } = require("../server/lib/db");

const handler = serverless(app);

module.exports = async (req, res) => {
  // Helpful logs for Vercel function debugging
  console.log(`Incoming request: ${req.method} ${req.url}`);

  // Normalize URL so it matches Express routes mounted under /api/*.
  // Vercel invokes this function at /api/*, while Express expects /api/*.
  // So we keep /api prefix and only collapse potential /api/server.
  try {
    if (req.url && req.url.startsWith("/api/server")) {
      req.url = req.url.replace(/^\/api\/server/, "/api");
    }
  } catch (err) {
    console.error("Error normalizing URL:", err);
  }

  // Ensure DB is connected for each cold start
  try {
    await connectDB();
  } catch (err) {
    console.error("DB connect failed:", err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    return res.end(
      JSON.stringify({ status: "error", message: "DB connection failed" })
    );
  }

  try {
    return await handler(req, res);
  } catch (err) {
    console.error("Handler error:", err && err.stack ? err.stack : err);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    return res.end(
      JSON.stringify({ status: "error", message: "Internal Server Error" })
    );
  }
};
