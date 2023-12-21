import "./index.scss";
import React from "react";

const WeatherCityData = ({ weatherData, selectedDate, selectedPeriod, cityName, onReturnClick }) => {
  
  // On déclare les données de l'array weatherData que l'on va afficher

  let temp_min, temp_max, temp_average, precipitation, sunshine, wind_speed;

  // Fonction pour rajouter des 0 devant le jour et le mois dans l'affichage de la date  

  const formatDate = (dateString) => {
    return dateString.split('/').map((part, index) => (index < 2 ? part.padStart(2, '0') : part)).join('/');
  };

  // Fonction pour rajouter C° à température

  const formatTemp = (temp) => {
    if (typeof temp === 'number') {
      return `${temp} C°`;
    } else {
        return temp;
      }
  };

  // Fonction pour rajouter mm à précipitations 

  const formatPrecipitaion = (precip) => {
    if (typeof precipitation === 'number') {
      return `${precip} mm`;
    } else {
      return precip;
    }
  };

  // Fonction pour gérer l'affichage de l'ensoleillement  (ex : 0.12 --> 0h12min)

  const formatSunshine = (sunshine) => {
    if (typeof sunshine === 'number') {
      const parts = sunshine.toString().split('.');
      const hours = parts[0];
      const minutes = parts[1] ? parts[1].padEnd(2, '0') : '00';
      return `${hours}h${minutes}min`;
    } else {
      return sunshine;
    }
  };

  // Fonction pour rajouter km/h à wind_speed 

  const formatWindSpeed = (windSpeed) => {
    if (typeof windSpeed === 'number') {
      return `${windSpeed} km/h`;
    } else {
      return windSpeed;
    }
  };

  // Affichage suivant la période choisie (jour, mois ou année)

  if (selectedPeriod === "1") {
    if (weatherData.length > 0) {
      const dayData = weatherData[0];
      temp_min = dayData.temp_min;
      temp_max = dayData.temp_max;
      temp_average = dayData.temp_average;
      precipitation = dayData.precipitation;
      sunshine = dayData.sunshine;
      wind_speed = dayData.wind_speed;
    }
  } else if (selectedPeriod === "2") {
    if (weatherData.length > 0) {
      const daysInMonth = weatherData.length;

      // Initialisation des variables pour les calculs d'agrégation
      
      let tempMinMin = Number.MAX_VALUE;
      let tempMaxMax = Number.MIN_VALUE;
      let tempTotal = 0;
      let precipitationTotal = 0;
      let sunshineTotal = 0;
      let windMax = Number.MIN_VALUE;

      // Parcours des données de chaque jour du mois pour effectuer les calculs d'agrégation
      
      for (let i = 0; i < daysInMonth; i++) {
        const dayData = weatherData[i];
        if (dayData.temp_min < tempMinMin) {
          tempMinMin = dayData.temp_min;
        }
        if (dayData.temp_max > tempMaxMax) {
          tempMaxMax = dayData.temp_max;
        }
        tempTotal += typeof dayData.temp_average === 'number' ? dayData.temp_average : 0;
        precipitationTotal += typeof dayData.precipitation === 'number' ? dayData.precipitation : 0;
        sunshineTotal += typeof dayData.sunshine === 'number' ? dayData.sunshine : 0;
        if (dayData.wind_speed > windMax) {
          windMax = dayData.wind_speed;
        }
      }

      temp_average = parseFloat((tempTotal / daysInMonth).toFixed(2));
      temp_min = parseFloat(tempMinMin);
      temp_max = parseFloat(tempMaxMax);
      precipitation = parseFloat(precipitationTotal.toFixed(2));
      sunshine = parseFloat(sunshineTotal.toFixed(2));
      wind_speed = parseFloat(windMax);

    }
  } else if (selectedPeriod === "3") {
    if (weatherData.length > 0) {
      const daysInYear = weatherData.length;
  
      // Initialisation des variables pour les calculs d'agrégation
      
      let tempMinMin = Number.MAX_VALUE;
      let tempMaxMax = Number.MIN_VALUE;
      let tempTotal = 0;
      let precipitationTotal = 0;
      let sunshineTotal = 0;
      let windMax = Number.MIN_VALUE;
  
      // Parcours des données de chaque jour de l'année pour effectuer les calculs d'agrégation
      
      for (let i = 0; i < daysInYear; i++) {
        const dayData = weatherData[i];
        if (dayData.temp_min < tempMinMin) {
          tempMinMin = dayData.temp_min;
        }
        if (dayData.temp_max > tempMaxMax) {
          tempMaxMax = dayData.temp_max;
        }
        tempTotal += typeof dayData.temp_average === 'number' ? dayData.temp_average : 0;
        precipitationTotal += typeof dayData.precipitation === 'number' ? dayData.precipitation : 0;
        sunshineTotal += typeof dayData.sunshine === 'number' ? dayData.sunshine : 0;
        if (dayData.wind_speed > windMax) {
          windMax = dayData.wind_speed;
        }
      }
  
      // Ajout de la 

      temp_average = parseFloat((tempTotal / daysInYear).toFixed(2));
  
      temp_min = parseFloat(tempMinMin);
      temp_max = parseFloat(tempMaxMax);
      precipitation = parseFloat(precipitationTotal.toFixed(2));
      sunshine = parseFloat(sunshineTotal.toFixed(2));
      wind_speed = parseFloat(windMax);
    }
  }
  

  

  return (
    <div className="weatherCityData">
      <h2>Données météorologiques :</h2>
      <h3>{cityName}</h3>
      <h4>{formatDate(selectedDate)}</h4>
      <ul>
        <li>Température minimale : {formatTemp(temp_min)}</li>
        <li>Température maximale : {formatTemp(temp_max)}</li>
        <li>Température moyenne : {formatTemp(temp_average)}</li>
        <li>Précipitations : {formatPrecipitaion(precipitation)}</li>
        <li>Ensoleillement : {formatSunshine(sunshine)}</li>
        <li>Vitesse maximale du vent : {formatWindSpeed(wind_speed)}</li>
      </ul>
      <button className="goBack" onClick={onReturnClick}>Retour</button>
    </div>
  );
};

export default WeatherCityData;
