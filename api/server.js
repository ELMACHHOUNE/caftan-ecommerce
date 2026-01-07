// Root-level Vercel serverless wrapper so Vercel picks up the function
// This file exports a handler that forwards requests to the Express app
// located at /server/server.js. It normalizes incoming paths so routes
// mounted under `/api/*` in the Express app are reachable when Vercel
// invokes this function (requests may arrive as /api/... or /api/server/...).
const serverless = require("serverless-http");

const app = require("../server/server");
const { connectDB } = require("../server/lib/db");

// Attempt a non-fatal DB connection at module init. This avoids throwing
// during module import (which would crash Vercel functions). Errors are
// logged for visibility.
(async () => {
  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
      console.log("DB connection initialized from root api wrapper");
    } else {
      console.warn(
        "MONGODB_URI not set; skipping DB connect in root api wrapper"
      );
    }
  } catch (err) {
    console.error("Non-fatal DB connect error in root api wrapper:", err);
  }
})();

const handler = serverless(app);

module.exports = async (req, res) => {
  // Basic request logging for debugging in Vercel function logs
  console.log(`Incoming request: ${req.method} ${req.url}`);

  try {
    let url = req.url || "";
    // Remove leading /api/server or /api if present so the Express app
    // receives paths matching its mounted routes (e.g. /api/auth -> /auth)
    url = url.replace(/^\/api\/server/, "");
    url = url.replace(/^\/api/, "");
    req.url = url || "/";
  } catch (err) {
    console.error("Error normalizing path in root api wrapper:", err);
  }

  try {
    return await handler(req, res);
  } catch (err) {
    // Catch synchronous or async errors from the handler to avoid
    // the function crashing without a helpful log.
    console.error("Handler error:", err && err.stack ? err.stack : err);
    try {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          status: "error",
          message: "Internal Server Error",
          details: err && err.message ? err.message : String(err),
        })
      );
    } catch (sendErr) {
      console.error("Error sending 500 response:", sendErr);
    }
    return undefined;
  }
};
