import type { PlanePanelProps } from "./Home";
import "./Popup.css";
 
export default function PlanePanel({ plane, onClose }: PlanePanelProps) {
  if (!plane) return null;
 
  const [icao24, callsign, country, longitude, latitude, altitude, onGround, velocity, heading] = plane;
 
  return (
    <aside className="plane-panel">
      <button className="plane-panel-close" onClick={onClose}>
        ×
      </button>
 
      <div className="plane-panel-header">
        <span className="plane-panel-icon">✈</span>
        <span className="plane-panel-callsign">{callsign?.trim() || "—"}</span>
      </div>
 
      <div className="plane-panel-row">
        <span className="plane-panel-label">ICAO24</span>
        <span className="plane-panel-value">{icao24}</span>
      </div>
      <div className="plane-panel-row">
        <span className="plane-panel-label">Country</span>
        <span className="plane-panel-value">{country}</span>
      </div>
      <div className="plane-panel-row">
        <span className="plane-panel-label">Latitude</span>
        <span className="plane-panel-value">{latitude}</span>
      </div>
      <div className="plane-panel-row">
        <span className="plane-panel-label">Longitude</span>
        <span className="plane-panel-value">{longitude}</span>
      </div>
      <div className="plane-panel-row">
        <span className="plane-panel-label">Altitude</span>
        <span className="plane-panel-value">{altitude} m</span>
      </div>
      <div className="plane-panel-row">
        <span className="plane-panel-label">Velocity</span>
        <span className="plane-panel-value">{velocity} m/s</span>
      </div>
      <div className="plane-panel-row">
        <span className="plane-panel-label">Heading</span>
        <span className="plane-panel-value">{heading}°</span>
      </div>
      <div className="plane-panel-row">
        <span className="plane-panel-label">On ground</span>
        <span className="plane-panel-value">{onGround ? "Yes" : "No"}</span>
      </div>
    </aside>
  );
}
 




