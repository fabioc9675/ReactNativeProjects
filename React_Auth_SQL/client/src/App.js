import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Views/home";
import Smoothies from "./Views/smoothies";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/smoothies" element={<Smoothies />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
