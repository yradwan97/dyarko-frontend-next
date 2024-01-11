import React, { useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { Calendar } from 'react-calendar';
import './style.css';

function CalendarComponent({ onDateChange }) {
  const [value, onChange] = useState(new Date());

  const handleDateChange = (date) => {
    onChange(date);
    onDateChange(date);
  };

  return (
    <div className="calendar-component">
      <Calendar onChange={handleDateChange} value={value} />
    </div>
  );
}

export default CalendarComponent;
