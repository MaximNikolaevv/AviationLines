import Navigation from "./components/Navigation/Navigation.tsx";
import HomePage from "./components/Home/HomePage";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register/register.tsx";
import Login from "./components/Login/login.tsx";
import Logout from "./components/Logout/logout";
import { useState, type Dispatch, type SetStateAction } from "react";
import { createTypedContext } from "./context/createTypedContext";

type UserContextValue = {
  isLogged: boolean;
  setIsLogged: Dispatch<SetStateAction<boolean>>;
};

const { Context: UserContext } = createTypedContext<UserContextValue>();

function App() {
  const [isLogged, setIsLogged] = useState(false);

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
