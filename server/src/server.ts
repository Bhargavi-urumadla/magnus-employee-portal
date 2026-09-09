import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDatabase from "./config/database";
import employeeRoutes from "./routes/employeeRoutes";
import errorHandler from "./middleware/errorHandler";

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT) || 5000;

const CLIENT_URL =
  process.env.CLIENT_URL || "http://localhost:5173";

// ================================
// Middleware
// ================================

app.use(
  cors({
    origin: CLIENT_URL,
  })
);

app.use(express.json());

// ================================
// Health Check
// ================================

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Magnus Employee Portal API is running",
  });
});

// ================================
// Employee Routes
// ================================

app.use("/api/employees", employeeRoutes);

// ================================
// Global Error Handler
// ================================

app.use(errorHandler);

// ================================
// Start Server
// ================================

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Application startup failed:", error);

    process.exit(1);
  }
};

startServer();