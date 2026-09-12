import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./HomePage.css";
import { useEffect } from "react";

export default function Homepage() {
  // const [, setPlanes] = useState([]);

  useEffect(() => {
    const loadPlanes = async () => {
      const response = await fetch("http://localhost:3000/api/flights");
      const planesInfo = await response.json();
      // setPlanes(planesInfo);
      console.log(planesInfo);

    };

    loadPlanes(); // веднага при mount

    const timer = setInterval(loadPlanes, 11000);

    return () => clearInterval(timer); // спира интервала при unmount/re-run
  }, []); // ← празен масив - изпълнява се само веднъж

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
