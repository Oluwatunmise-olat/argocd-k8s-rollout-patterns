const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
const VERSION = process.env.VERSION || "v1.0";

app.get("/", (req, res) => {
  res.json({
    message: `(Canary): Hello from version ${VERSION}!`,
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "(Canary): healthy",
    version: VERSION,
  });
});

app.get("/health-metric", (req, res) => {
  // Simulated connection health
  const dbConnectionHealthy = true;
  const redisConnectionHealthy = true;

  const isHealthy = dbConnectionHealthy && redisConnectionHealthy;

  const message = isHealthy ? "Dependencies healthy" : "Dependencies unhealthy";

  res.status(200).json({ status: isHealthy, message });
});

app.get("/status", (req, res) => {
  res.json({
    status: "(Canary): up",
    version: VERSION,
    uptime: process.uptime(),
  });
});

app.get("/info", (req, res) => {
  res.json({
    app: "(Canary): ArgoCD Rollout Test",
    version: VERSION,
    environment: process.env.NODE_ENV || "development",
  });
});

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}, version: ${VERSION}`);
});
