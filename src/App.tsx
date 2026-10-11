import Navigation from "./components/Navigation/Navigation.tsx";
import HomePage from "./components/Home/HomePage";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register/register.tsx";
import Login from "./components/Login/login.tsx";
import Logout from "./components/Logout/logout";
import { useState } from "react";
import { UserContext } from "./context/context";

function App() {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  return (
    <UserContext.Provider value={{ isLogged, setIsLogged }}>
      <div id="box">
        <Navigation />

        <main id="main-content">
          <Routes>
            <Route index path="/" element={<HomePage />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
          </Routes>
        </main>
      </div>
    </UserContext.Provider>
  );
}

export default App;
