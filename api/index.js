// NOTE: This repo previously exposed a Vercel serverless function under `/api/*`.
// The backend is now intended to live ONLY under the standalone `server/` package
// so it can be deployed independently and carry its own `.env`.
//
// If you are seeing requests hit this file, update your deployment to run
// `server/server.js` (or deploy the `server/` folder as its own service).
module.exports = (req, res) => {
  res.statusCode = 410;
  res.setHeader("Content-Type", "application/json");
  res.end(
    JSON.stringify({
      status: "error",
      message:
        "API moved: deploy the backend from the server/ folder (this root /api endpoint is disabled).",
    })
  );
};
