import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import Footer from "./components/Footer/Footer";
import Compare from "./components/Compare/Compare";
import City from "./components/City/City";
import Evolution from "./components/Evolution/Evolution";
import { WeatherDataProvider } from "./components/WeatherDataContext/WeatherDataContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WeatherDataProvider>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Banner />} />
          <Route path="/Compare" element={<Compare />} />
          <Route path="/City" element={<City />} />
          <Route path="/Evolution" element={<Evolution />} />
        </Routes>
        <Footer />
      </Router>
    </WeatherDataProvider>
  </React.StrictMode>
);
