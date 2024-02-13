import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import { Calendar } from 'react-calendar';
import './style.css';

function CalendarComponent({ onDateChange, dateRanges }) {
  // State to manage the selected date
  const [selectedDate, setSelectedDate] = useState(new Date());

  // State to store selectable dates based on dateRanges
  const [selectableDates, setSelectableDates] = useState([]);

  // Update selectableDates whenever dateRanges changes
  useEffect(() => {
    const updatedSelectableDates = dateRanges.flatMap(range => {
      const startDate = new Date(range.from);
      const endDate = new Date(range.to);
      const dates = [];
      let current = new Date(startDate);

      while (current <= endDate) {
        dates.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }

      return dates;
    });

    setSelectableDates(updatedSelectableDates);
  }, [dateRanges]);

  // Function to handle date change
  const handleDateChange = date => {
    setSelectedDate(date);
    onDateChange(date);
  };

  // Function to disable tiles based on selectableDates
  const tileDisabled = ({ date }) => {
    return selectableDates.every(d => d.toDateString() !== date.toDateString());
  };

  return (
    <div className="calendar-component">
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileDisabled={tileDisabled}
      />
    </div>
  );
}

export default CalendarComponent;
