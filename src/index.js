const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
const VERSION = process.env.VERSION || "v1.0";

app.get("/", (req, res) => {
  res.json({
    message: `Hello from version ${VERSION}!`,
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    version: VERSION,
  });
});

app.get("/status", (req, res) => {
  res.json({
    status: "up",
    version: VERSION,
    uptime: process.uptime(),
  });
});

app.get("/info", (req, res) => {
  res.json({
    app: "ArgoCD Rollout Test",
    version: VERSION,
    environment: process.env.NODE_ENV || "development",
  });
});

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}, version: ${VERSION}`);
});
