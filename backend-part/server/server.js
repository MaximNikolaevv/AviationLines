import express from "express";
import routes from "./routes/routes.js";

const app = express();
const PORT = 3000;

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
