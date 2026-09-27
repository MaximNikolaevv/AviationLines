import Navigation from "./components/Navigation/Navigation";
import HomePage from "./components/Home/HomePage";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register/register.tsx";
import Login from "./components/Login/login.tsx";

function App() {
  return (
    <div id="box">
      <Navigation />

      <main id="main-content">
        <Routes>
          <Route index path="/" element={<HomePage />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
