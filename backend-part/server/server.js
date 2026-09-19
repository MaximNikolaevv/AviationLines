import express from "express";
import mongoose from "mongoose";
import routes from "../routes/routes.js";
import authMiddlewares from "../MiddleWares/MiddleWare.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;

app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

const MONGO_URI = "mongodb://localhost:27017/aviationlines";

const connectMongo = async () => {
  try {
    await mongoose.connect(MONGO_URI);
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