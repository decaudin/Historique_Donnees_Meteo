import { useState } from 'react';

export const useDataSelection = () => {

  // Initialisation de nos variables d'état pour la période choisie (L7), le type de formulaire à afficher suivant la période choisie (L11-15), l'année et/ou le mois et/ou le jour choisi (L8-10)

  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [formVisibility, setFormVisibility] = useState({
    day: false,
    month: false,
    year: false,
  });

   // Fonction de callback pour afficher le bon select suivant la période choisie (jour, mois ou année) dans le composant enfant DateSelection et vider les champs remplis si changement de période

  const handlePeriodChange = (e) => {
    const selectedValue = e.target.value;

     // Réinitialiser les champs associés à la période si la période change
    if (selectedValue !== selectedPeriod) {
      setSelectedYear('');
      setSelectedMonth('');
      setSelectedDay('');
    }

    setSelectedPeriod(selectedValue);
    setFormVisibility({
      day: selectedValue === '1',
      month: selectedValue === '2',
      year: selectedValue === '3',
    });
  };

  // Fonctions de callback pour récupérer les valeurs choisies dans les différents select via le composant enfant DateSelection

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  // Fonctions pour afficher les jours, mois et années dans les selects du composant enfant DateSelection 

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

  const generateMonthOptions = () => {
    return generateOptions(1, 12, (month) =>
      new Date(2000, month - 1).toLocaleString('default', { month: 'long' })
    );
  };

  const generateYearOptions = () => {
    return generateOptions(2000, 2023, (year) => year);
  };

  return {
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
  };
}
