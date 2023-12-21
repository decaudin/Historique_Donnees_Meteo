import React from 'react';
import "./index.scss";

const DateSelection = ({ selectedPeriod, formVisibility, handlePeriodChange, handleYearChange, handleMonthChange, handleDayChange, generateDayOptions, generateYearOptions, generateMonthOptions, label }) => {

  return (
    <div className='chooseTypeOfPeriod'>
      <label htmlFor="typeOfPeriod" className="period">
        {label}
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
            <select id="fineDay" onChange={handleDayChange}>
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
    </div>
  );
};

export default DateSelection;