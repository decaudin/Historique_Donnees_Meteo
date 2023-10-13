import "./Compare.scss";
import React, { useState } from 'react';

const Compare = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [formVisibility, setFormVisibility] = useState({
    day: false,
    month: false,
    year: false,
  });

  const handlePeriodChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedPeriod(selectedValue);
    setFormVisibility({
      day: selectedValue === '1',
      month: selectedValue === '2',
      year: selectedValue === '3',
    });
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const generateOptions = (start, end, formatter) => {
    return Array.from({ length: end - start + 1 }, (_, index) => {
      const value = start + index;
      return (
        <option key={value} value={value}>
          {formatter(value)}
        </option>
      );
    });
  };

  const generateDayOptions = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    return generateOptions(1, daysInMonth, (day) => day);
  };

  const generateYearOptions = () => {
    return generateOptions(2000, 2023, (year) => year);
  };

  const generateMonthOptions = () => {
    return generateOptions(1, 12, (month) =>
      new Date(2000, month - 1).toLocaleString('default', { month: 'long' })
    );
  };

  return (
    <div className="compare">
      <h3>Bienvenue sur l'outil de comparaison des données.</h3>
      <form className="chooseType">
        <label htmlFor="typeOfPeriod" className="period">
          Choisissez sur quel type de période va porter votre comparaison
        </label>
        <select id="typeOfPeriod" onChange={handlePeriodChange} value={selectedPeriod}>
          <option value=""></option>
          <option value="1">jour</option>
          <option value="2">mois</option>
          <option value="3">année</option>
        </select>

        {formVisibility.day && (
          <div className="chooseDay">
            <div className="year">
              <label htmlFor="fineYear">Choisissez l'année</label>
              <select id="fineYear" onChange={handleYearChange}>
                <option value=""></option>
                {generateYearOptions()}
              </select>
            </div>
            <div className="month">
              <label htmlFor="fineMonth">Choisissez le mois</label>
              <select id="fineMonth" onChange={handleMonthChange}>
                <option value=""></option>
                {generateMonthOptions()}
              </select>
            </div>
            <div className="day">
              <label htmlFor="fineDay">Choisissez le jour</label>
              <select id="fineDay" onChange={(e) => setSelectedDay(e.target.value)}>
                <option value=""></option>
                {generateDayOptions()}
              </select>
            </div>
          </div>
        )}

        {formVisibility.month && (
          <div className="chooseMonth">
            <div className="year">
              <label htmlFor="fineYear">Choisissez l'année</label>
              <select id="fineYear" onChange={handleYearChange}>
                <option value=""></option>
                {generateYearOptions()}
              </select>
            </div>
            <div className="month">
              <label htmlFor="fineMonth">Choisissez le mois</label>
              <select id="fineMonth" onChange={handleMonthChange}>
                <option value=""></option>
                {generateMonthOptions()}
              </select>
            </div>
          </div>
        )}

        {formVisibility.year && (
          <div className="chooseYear">
            <label htmlFor="fineYear">Choisissez l'année</label>
            <select id="fineYear" onChange={handleYearChange}>
              <option value=""></option>
              {generateYearOptions()}
            </select>
          </div>
        )}

        <label htmlFor="typeOfData" className="data">
          Choisissez les données que vous souhaitez comparer
        </label>
        <select id="typeOfData">
          <option value=""></option>
          <option value="1">Température minimale [C°]</option>
          <option value="2">Température maximale [C°]</option>
          <option value="3">Température moyenne [C°]</option>
          <option value="4">Vent maximal [km/h]</option>
          <option value="5">Ensoleillement [h]</option>
          <option value="6">Précipitations totales [mm]</option>
        </select>
        <input type="submit" className="submitButton" value="Valider" />
      </form>
    </div>
  );
};

export default Compare;
