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

module.exports = (req, res) => {
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
  return handler(req, res);
};
