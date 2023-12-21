import React, { useState, useEffect } from 'react';
import "./index.scss";
import DateSelection from '../../components/DateSelection';
import { useDataSelection, useWeatherData } from '../../utils/hooks';

const Compare = () => {
  const {
    selectedPeriod,
    selectedYear,
    selectedMonth,
    selectedDay,
    formVisibility,
    handlePeriodChange,
    handleYearChange,
    handleMonthChange,
    handleDayChange,
    generateDayOptions,
    generateYearOptions,
    generateMonthOptions,
  } = useDataSelection();

  const weatherData = useWeatherData();
  console.log(weatherData);
  const [isFormValid, setIsFormValid] = useState(false);
  const [selectedDataWeather, setSelectedDataWeather] = useState("");

  const handleDataWeatherChange = (e) => {
    setSelectedDataWeather(e.target.value);
  };

  useEffect(() => {
    let allFieldsFilled = false;

    if (selectedPeriod === "1") {
      allFieldsFilled = selectedDataWeather !== "" && selectedYear !== "" && selectedMonth !== "" && selectedDay !== "";
    } else if (selectedPeriod === "2") {
      allFieldsFilled = selectedDataWeather !== "" && selectedYear !== "" && selectedMonth !== "";
    } else if (selectedPeriod === "3") {
      allFieldsFilled = selectedDataWeather !== "" && selectedYear !== "";
    }

    setIsFormValid(allFieldsFilled);
  }, [selectedDataWeather, selectedPeriod, selectedYear, selectedMonth, selectedDay]);
  
  return (
    <div className="compare">
      <h3>Bienvenue sur l'outil de comparaison des données :</h3>
      <h4>Comparez les données de votre choix sur la période souhaitée</h4>
      <form className="chooseType">
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
          label="Choisissez sur quel type de période va porter votre comparaison"
        />

        <label htmlFor="typeOfData" className="data">
          Choisissez les données que vous souhaitez comparer
        </label>
        <select id="typeOfData" onChange={handleDataWeatherChange}>
          <option value=""></option>
          <option value="1">Température minimale [C°]</option>
          <option value="2">Température maximale [C°]</option>
          <option value="3">Température moyenne [C°]</option>
          <option value="4">Vent maximal [km/h]</option>
          <option value="5">Ensoleillement [h]</option>
          <option value="6">Précipitations totales [mm]</option>
        </select>
        <input type="submit" className={`submitButton ${isFormValid ? 'green' : ''}`} value="Valider" />
      </form>
    </div>
  );
};

export default Compare;


