import React, { useState, useEffect } from 'react';
import "./index.scss";
import DateSelection from '../../components/DateSelection';
import WeatherCityData from '../../components/WeatherCityData';
import { useDataSelection, useWeatherData } from '../../utils/hooks';

export const City = () => {
  const {
    selectedPeriod, setSelectedPeriod, selectedYear, setSelectedYear, selectedMonth, setSelectedMonth, selectedDay, setSelectedDay, formVisibility, setFormVisibility, handlePeriodChange, handleYearChange, handleMonthChange, handleDayChange, generateDayOptions, generateYearOptions, generateMonthOptions,
  } = useDataSelection();

  const weatherData = useWeatherData();
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedCityKey, setSelectedCityKey] = useState("");
  const [displayedWeatherData, setDisplayedWeatherData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleCityChange = (e) => {
    setSelectedCityKey(e.target.value);
  };

  useEffect(() => {
    let allFieldsFilled = false;

    if (selectedPeriod === "1") {
      allFieldsFilled = selectedCityKey !== "" && selectedYear !== "" && selectedMonth !== "" && selectedDay !== "";
    } else if (selectedPeriod === "2") {
      allFieldsFilled = selectedCityKey !== "" && selectedYear !== "" && selectedMonth !== "";
    } else if (selectedPeriod === "3") {
      allFieldsFilled = selectedCityKey !== "" && selectedYear !== "";
    }

    setIsFormValid(allFieldsFilled);
  }, [selectedCityKey, selectedPeriod, selectedYear, selectedMonth, selectedDay]);

  const getCityName = (cityKey) => {
    switch (cityKey) {
      case "1":
        return "Bordeaux";
      case "2":
        return "Clermont-Ferrand";
      case "3":
        return "Marseille";
      case "4":
        return "Nîmes";
      case "5":
        return "Paris";
      case "6":
        return "Saint-Girons";
      case "7":
        return "Toulouse";
      default:
        return "Sélectionnez une ville";
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    const cityName = getCityName(selectedCityKey); // Obtenir le nom de la ville correspondant à la clé
  
    if (cityName !== "Sélectionnez une ville") {
      const cityData = weatherData.cities.find((city) => city.city_id === parseInt(selectedCityKey, 10));
  
      if (cityData) {
        const yearData = cityData.years.find((year) => year.year === parseInt(selectedYear, 10));
  
        if (yearData) {
          if (selectedPeriod === "1") {
            const monthData = yearData.months.find((month) => month.month === parseInt(selectedMonth, 10));
  
            if (monthData) {
              const dayData = monthData.days.find((day) => day.day === parseInt(selectedDay, 10));
  
              if (dayData) {
                const weatherForSelectedDate = dayData.data_weather;
                setDisplayedWeatherData(weatherForSelectedDate);
                setSelectedDate(`${selectedDay}/${selectedMonth}/${selectedYear}`);
              } else {
                console.log("Données introuvables pour le jour sélectionné");
              }
            } else {
              console.log("Données introuvables pour le mois sélectionné");
            }
          } else if (selectedPeriod === "2") {
            const monthData = yearData.months.find((month) => month.month === parseInt(selectedMonth, 10));
  
            if (monthData) {
              const weatherForSelectedDate = monthData.days.map((day) => day.data_weather);
              const flattenedWeatherData = weatherForSelectedDate.flat();
              setDisplayedWeatherData(flattenedWeatherData);
              setSelectedDate(`${selectedMonth}/${selectedYear}`);
            } else {
              console.log("Données introuvables pour le mois sélectionné");
            }
          } else if (selectedPeriod === "3") {
            const weatherForSelectedDate = [];
            yearData.months.forEach((month) => {
              month.days.forEach((day) => {
                weatherForSelectedDate.push(day.data_weather);
              });
            });
          
            setDisplayedWeatherData(weatherForSelectedDate);
            setSelectedDate(`${selectedYear}`);
          }
           else {
          console.log("Données introuvables pour l'année sélectionnée");
        }
      }
      } else {
        console.log("Données introuvables pour la ville sélectionnée");
      }
    } else {
      console.log("Veuillez sélectionner une ville");
    }
  };
  

  return (
    <div className="cityData">
      {displayedWeatherData ? (
        <WeatherCityData
          weatherData={displayedWeatherData}
          cityName={getCityName(selectedCityKey)}
          selectedDate={selectedDate}
          selectedPeriod={selectedPeriod}
          onReturnClick={() => {
            setDisplayedWeatherData(null);
            setSelectedPeriod("");
            setSelectedCityKey("");
            setSelectedYear("");
            setSelectedMonth("");
            setSelectedDay("");
            setFormVisibility(false);
          }} />
      ) : (
        <div className="compare">
          <h3>Bienvenue sur l'outil de visualisation des données relatives à une ville :</h3>
          <h4>Consultez l'ensemble des données d'une ville sur la période souhaitée</h4>
          <form className="chooseType" onSubmit={handleFormSubmit}>
            <DateSelection
              selectedPeriod={selectedPeriod}
              selectedYear={selectedYear}
              selectedMonth={selectedMonth}
              selectedDay={selectedDay}
              formVisibility={formVisibility}
              handlePeriodChange={handlePeriodChange}
              handleYearChange={handleYearChange}
              handleMonthChange={handleMonthChange}
              handleDayChange={handleDayChange}
              generateDayOptions={generateDayOptions}
              generateYearOptions={generateYearOptions}
              generateMonthOptions={generateMonthOptions}
              label="Choisissez sur quel type de période vous souhaitez consulter les données" />

            <label htmlFor="chooseCity" className="city">
              Choisissez la ville dont vous souhaitez voir les données
            </label>
            <select id="chooseCity" onChange={handleCityChange}>
              <option value=""></option>
              <option value="1">Bordeaux</option>
              <option value="2">Clermont-Ferrand</option>
              <option value="3">Marseille</option>
              <option value="4">Nîmes</option>
              <option value="5">Paris</option>
              <option value="6">Saint-Girons</option>
              <option value="7">Toulouse</option>
            </select>
            <input type="submit" className={`submitButton ${isFormValid ? 'green' : ''}`} value="Valider" />
          </form>
        </div>
      )}
    </div>
  );
};

export default City;
