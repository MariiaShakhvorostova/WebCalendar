import React, { useState, useRef, useEffect } from "react";
import "./dropdownCalendars.css";

const DropdownCalendars = ({ options, selectedOption, onOptionChange }) => {
  const [visible, setVisible] = useState(false);
  const [currentSelectedOption, setCurrentSelectedOption] =
    useState(selectedOption);
  const dropdownRef = useRef(null);

  const handleOptionClick = (option) => {
    onOptionChange(option);
    setCurrentSelectedOption(option);
    setVisible(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (
      !options.find((option) => option.title === currentSelectedOption.title)
    ) {
      setCurrentSelectedOption(selectedOption);
    }
  }, [options]);

  useEffect(() => {
    setCurrentSelectedOption(selectedOption);
  }, [selectedOption]);

  const renderOption = (option) => {
    const iconUrl = `/src/assets/imgs/colors/${option.color}.png`;
    return (
      <div
        className="calendar-option"
        key={option.title}
        onClick={() => handleOptionClick(option)}
      >
        <div
          className="color-icon"
          style={{ backgroundImage: `url(${iconUrl})` }}
        ></div>
        <span>{option.title}</span>
      </div>
    );
  };

  const selectedIconUrl = `/src/assets/imgs/colors/${currentSelectedOption.color}.png`;

  return (
    <div className="dropdown-calendars" ref={dropdownRef}>
      <div className="dropdown-header" onClick={() => setVisible(!visible)}>
        <div
          className="color-icon"
          style={{ backgroundImage: `url(${selectedIconUrl})` }}
        ></div>
        <span className="selected-option">{currentSelectedOption.title}</span>
      </div>
      {visible && (
        <div className="dropdown-menu">{options.map(renderOption)}</div>
      )}
    </div>
  );
};

export default DropdownCalendars;
