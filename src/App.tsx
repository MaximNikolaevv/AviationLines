import Navigation from "./components/Navigation/Navigation";
import HomePage from "./components/Home/HomePage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div id="box">
      <Navigation />

      <main id="main-content">
        <Routes>
          <Route index path="/" element={<HomePage />}></Route>
          
        </Routes>
      </main>
    </div>
  );
}

export default App;
