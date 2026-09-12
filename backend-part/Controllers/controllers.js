import { Router } from 'express'

const Controllers = Router();


Controllers.get("/flights", async (req, res) => {
  
const response = await fetch('https://opensky-network.org/api/states/all?lamin=41.2&lamax=44.3&lomin=22.3&lomax=28.7');
const planesInfo = await response.json();

  res.json(planesInfo)

});



export default Controllers;