import { Router } from "express";

const Controllers = Router();

Controllers.get("/flights", async (req, res) => {
  try {
    const response = await fetch(
      "https://opensky-network.org/api/states/all?lamin=41.2&lamax=44.3&lomin=22.3&lomax=28.7",
    );

    console.log("Remaining:", response.headers.get("x-rate-limit-remaining"));
    console.log("Retry after:", response.headers.get("x-rate-limit-retry-after-seconds"));

    const planesInfo = await response.json();
    res.json(planesInfo);
  } catch (err) {
    console.error(err);
  }
});

export default Controllers;
