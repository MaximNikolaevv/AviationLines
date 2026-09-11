import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./HomePage.css";

export default function Homepage() {
  return (
    <MapContainer
      className="home-map"
      center={[42.6977, 23.3219]}
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
