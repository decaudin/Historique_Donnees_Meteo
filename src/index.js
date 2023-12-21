import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Compare from "./pages/Compare";
import City from "./pages/City";
import Evolution from "./pages/Evolution";
import { WeatherDataProvider } from "./utils/context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WeatherDataProvider>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Compare" element={<Compare />} />
          <Route path="/City" element={<City />} />
          <Route path="/Evolution" element={<Evolution />} />
        </Routes>
        <Footer />
      </Router>
    </WeatherDataProvider>
  </React.StrictMode>
);
