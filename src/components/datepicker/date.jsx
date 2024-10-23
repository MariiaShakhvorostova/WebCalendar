/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./date.css";

const Datepicker = ({ value, onChange }) => {
  const [clickedDay, setClickedDay] = useState(null);

  useEffect(() => {
    if (value) {
      setClickedDay(value.getDate());
    }
  }, [value]);

  const changeMonth = (increment) => {
    onChange(new Date(value.setMonth(value.getMonth() + increment)));
    setClickedDay(null);
  };

  const handleDayClick = (day, className) => {
    if (className === "current-month") {
      const newDate = new Date(value);
      newDate.setDate(day);
      setClickedDay(day);
      onChange(newDate);
    } else if (className === "previous-month") {
      changeMonth(-1);
    } else if (className === "next-month") {
      changeMonth(1);
    }
  };

  const getWeekdays = () => {
    const weekdays = ["S", "M", "T", "W", "T", "F", "S"];
    return weekdays.map((day, index) => <div key={index}>{day}</div>);
  };

  const getMonthDays = () => {
    const year = value.getFullYear();
    const month = value.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    let days = [];
    const lastDayOfWeek = new Date(year, month + 1, 0).getDay();

    const prevMonthDays = new Date(year, month, 0).getDate();
    const nextMonthDays = 7 - lastDayOfWeek - 1;

    for (let i = prevMonthDays - firstDayOfWeek + 1; i <= prevMonthDays; i++) {
      days.push({ day: i, className: "previous-month" });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, className: "current-month" });
    }
    for (let i = 1; i <= nextMonthDays + 7; i++) {
      days.push({ day: i, className: "next-month" });
    }

    return days.map((item, index) => (
      <div
        key={index}
        className={`day ${item.className}${
          item.day === value.getDate() &&
          item.className === "current-month" &&
          item.day === clickedDay
            ? " selected"
            : ""
        }`}
        onClick={() => handleDayClick(item.day, item.className)}
      >
        {item.day}
      </div>
    ));
  };

  return (
    <div className="datepicker">
      <div className="month-controls">
        <div className="current-month">
          {value.toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </div>
        <div className="arrow-container">
          <img
            src="/src/assets/imgs/left.png"
            alt="Previous Month"
            className="arrow"
            onClick={() => changeMonth(-1)}
          />
          <img
            src="/src/assets/imgs/right.png"
            alt="Next Month"
            className="arrow"
            onClick={() => changeMonth(1)}
          />
        </div>
      </div>
      <div className="weekdays">{getWeekdays()}</div>
      <div className="month-days">{getMonthDays()}</div>
    </div>
  );
};

export default Datepicker;
