import "./Compare.scss";
import React, { useState } from 'react';

const Compare = () => {
   const [selectedPeriod, setSelectedPeriod] = useState('');
   const [formDayVisible, setFormDayVisible] = useState(false);
   const [formMonthVisible, setFormMonthVisible] = useState(false);
   const [formYearVisible, setFormYearVisible] = useState(false);
   const [selectedYear, setSelectedYear] = useState('');
   const [selectedMonth, setSelectedMonth] = useState('');
   const [selectedDay, setSelectedDay] = useState('');

   const handlePeriodChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedPeriod(selectedValue);
    setFormDayVisible(selectedValue === '1');
    setFormMonthVisible(selectedValue === '2');
    setFormYearVisible(selectedValue === '3');
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const generateDayOptions = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const dayOptions = [];
  
    for (let day = 1; day <= daysInMonth; day++) {
      dayOptions.push(
        <option key={day} value={day}>
          {day}
        </option>
      );
    }
  
    return dayOptions;
  };

  return (
    <div className="compare">
        <h3>Bienvenue sur l'outil de comparaison des données.</h3>
        <form className="chooseType">
            <label htmlFor="typeOfPeriod" className="period">Choisissez sur quel type de période va porter votre comparaison</label>
            <select id="typeOfPeriod" onChange={handlePeriodChange} value={selectedPeriod}>
                <option value=""></option>
                <option value="1">jour</option>
                <option value="2">mois</option>
                <option value="3">année</option>
            </select>

            {formDayVisible && (
              <div className="chooseDay">
                <div className="year">
                  <label htmlFor="fineYear">Choisissez l'année</label>
                  <select id="fineYear" onChange={handleYearChange}>
                    <option value=""></option>
                    {Array.from({ length: 24 }, (_, index) => {
                      const year = 2000 + index;
                      return <option key={year} value={year}>{year}</option>;
                    })}
                  </select>
                </div>
                <div className="month">
                  <label htmlFor="fineMonth">Choisissez le mois</label>
                  <select id="fineMonth" onChange={handleMonthChange}>
                    <option value=""></option>
                    {Array.from({ length: 12 }, (_, index) => {
                      const month = index + 1;
                      const monthName = new Date(2000, index).toLocaleString('default', { month: 'long' });
                      return <option key={month} value={month}>{monthName}</option>;
                    })}
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

            {formMonthVisible && (
              <div className="chooseMonth">
                <div className="year">
                  <label htmlFor="fineYear">Choisissez l'année</label>
                  <select id="fineYear" onChange={handleYearChange}>
                    <option value=""></option>
                    {Array.from({ length: 24 }, (_, index) => {
                      const year = 2000 + index;
                      return <option key={year} value={year}>{year}</option>;
                    })}
                  </select>
                </div>
                <div className="month">
                  <label htmlFor="fineMonth">Choisissez le mois</label>
                  <select id="fineMonth" onChange={handleMonthChange}>
                    <option value=""></option>
                    {Array.from({ length: 12 }, (_, index) => {
                      const month = index + 1;
                      const monthName = new Date(2000, index).toLocaleString('default', { month: 'long' });
                      return <option key={month} value={month}>{monthName}</option>;
                    })}
                  </select>
                </div>
              </div>
            )}

            {formYearVisible && (
              <div className="chooseYear">        
                <label htmlFor="fineYear">Choisissez l'année</label>
                <select id="fineYear" onChange={handleYearChange}>
                  <option value=""></option>
                  {Array.from({ length: 24 }, (_, index) => {
                    const year = 2000 + index;
                    return <option key={year} value={year}>{year}</option>;
                  })}
                </select>
              </div>
            )}

            <label htmlFor="typeOfData" className="data">Choisissez les données que vous souhaitez comparer</label>
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
}

export default Compare;
