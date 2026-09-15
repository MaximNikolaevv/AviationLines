import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./HomePage.css";
import "./Popup.css";
import { useEffect, useState } from "react";
import { divIcon } from "leaflet";
import PlanePanel from "./PlanePanel.tsx";
import type { Plane, PlanesInfo } from "./Home.ts";


export default function Homepage() {
  const [planesInfo, setPlanes] = useState<PlanesInfo>({ states: [] });
  const [selectedPlane, setSelectedPlane] = useState<Plane | null>(null);

  useEffect(() => {
    const loadPlanes = async () => {
      const response = await fetch("http://localhost:3000/api/flights");
      const planesInfo = await response.json();
      setPlanes(planesInfo);
    };

    loadPlanes(); // веднага при mount

    const timer = setInterval(loadPlanes, 5000);

    return () => clearInterval(timer); // спира интервала при unmount/re-run
  }, []); // ← празен масив - изпълнява се само веднъж

  const createPlaneIcon = (degree: number) =>
    divIcon({
      html: `<img src="https://cdn-icons-png.flaticon.com/128/17796/17796836.png"
              style="width: 20px; height: 20px; transform: rotate(${degree}deg);" />`,
      className: "plane-marker",
      iconSize: [20, 20],
    });

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

      {planesInfo.states?.map((plane) => (
        <>
          <Marker
            key={plane[0]}
            position={[plane[6], plane[5]]}
            icon={createPlaneIcon(plane[10])}
            eventHandlers={{ click: () => setSelectedPlane(plane) }}
          >
            <Popup>
              <div className="plane-popup">
                <div className="plane-popup-country">{plane[2]}</div>
                <div className="plane-popup-row">
                  <span className="plane-popup-label">Altitude: </span>
                  <span className="plane-popup-value">{plane[7]} m</span>
                </div>
                <div className="plane-popup-row">
                  <span className="plane-popup-label">Speed: </span>
                  <span className="plane-popup-value">{plane[9]} m/s</span>
                </div>
              </div>
            </Popup>
          </Marker>
        </>
      ))}

      {selectedPlane && (
        <PlanePanel
          plane={selectedPlane}
          onClose={() => setSelectedPlane(null)}
        />
      )}
    </MapContainer>
  );
}
