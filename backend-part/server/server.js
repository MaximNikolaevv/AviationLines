import express from "express";
import mongoose from "mongoose";
import routes from "../routes/routes.js";
import authMiddlewares from "../MiddleWares/MiddleWare.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;
const MONGO_HOST = "127.0.0.1";
const MONGO_PORT = 27017;
const MONGO_DB_NAME = "aviationlines";
const MONGO_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}`;

app.use(express.json());

// Позволява заявки от Vite frontend-а.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

const connectMongo = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
};

connectMongo();

app.use(cookieParser());
app.use(authMiddlewares);
app.use(routes);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "AviationLines server is running" });
});

app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`AviationLines server is running at http://localhost:${PORT}`);
});
