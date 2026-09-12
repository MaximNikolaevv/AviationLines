import { useEffect, useState } from "react";
import "./Navigation.css";
import { Link } from "react-router-dom";

export default function Navigation() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {  // useEffect se izpulnqva sled render-a! 
    setInterval(() => {
      setTime(new Date()); // pri vsqka promqna na SetTime UI se zarejda otnovo s novite promeni
    }, 1000);
  }, []);

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link className="nav-logo" to="/">
          PlanesOnLive🔴
        </Link>
        <Link to="/BrowseFlights" className="btn-Flights">
          Browse Flights
        </Link>
        <Link to="/BrowseWeather" className="btn-Weather">
          Browse Weather
        </Link>
        <span className="clock">{time.toLocaleTimeString()}</span>
      </div>

      <div className="nav-right">
        <span className="welcome"></span>
        <Link to="/logout" className="btn-logout">
          Logout
        </Link>

        <Link to="/login" className="btn-login">
          Login
        </Link>
        <Link to="/register" className="btn-register">
          Register
        </Link>
      </div>
    </nav>
  );
}
