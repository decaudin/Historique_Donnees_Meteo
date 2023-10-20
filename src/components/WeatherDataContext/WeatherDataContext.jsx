import React, { createContext, useContext, useState, useEffect } from 'react';

const WeatherDataContext = createContext();

export const WeatherDataProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchMeteoData = async () => {
      try {
        const response = await fetch("../../Data/dataWeather.json");
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Erreur lors du chargement des données météo :", error);
      }
    };

    fetchMeteoData();
  }, []);

  return (
    <WeatherDataContext.Provider value={weatherData}>
      {children}
    </WeatherDataContext.Provider>
  );
};

export const useWeatherData = () => {
  return useContext(WeatherDataContext);
};
