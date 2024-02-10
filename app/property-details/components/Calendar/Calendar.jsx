import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import { Calendar } from 'react-calendar';
import './style.css';

function CalendarComponent({ onDateChange, dateRanges }) {
  const [value, onChange] = useState(new Date());
  const [selectableDates, setSelectableDates] = useState([]);

  useEffect(() => {
    // Generate an array of selectable dates based on the dateRanges
    const updatedSelectableDates = dateRanges.reduce((dates, range) => {
      const startDate = new Date(range.from);
      const endDate = new Date(range.to);
      const current = new Date(startDate);

      while (current <= endDate) {
        dates.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }

      return dates;
    }, []);

    setSelectableDates(updatedSelectableDates);
  }, [dateRanges]);

  const handleDateChange = (date) => {
    onChange(date);
    onDateChange(date);
  };

  const tileDisabled = ({ date }) => {
    // // Disable dates that are not in the selectableDates array
    // return selectableDates.findIndex((d) => d.toDateString() === date.toDateString()) === -1;
  };

  return (
    <div className="calendar-component">
      <Calendar
        onChange={handleDateChange}
        value={value}
        tileDisabled={tileDisabled}
      />
    </div>
  );
}

export default CalendarComponent;
