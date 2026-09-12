import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./HomePage.css";
import { useEffect, useState } from "react";

export default function Homepage() {
  const [planes, setPlanes] = useState([]);

  useEffect(() => {
    setInterval(async () => {
        
      const response = await fetch("http://localhost:5000/api/flights");
      const planes = await response.json();

      setPlanes(planes);
    }, 12000);
  }, []);

  return (
    <MapContainer
      className="home-map"
      center={[42.7339, 25.4858]}
      zoom={6.5}
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}
