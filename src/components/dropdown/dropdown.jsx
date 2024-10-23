/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import "./dropdown.css";

const Dropdown = ({ value, options, onOptionChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value || options[0]);
  const dropdownRef = useRef(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    if (onOptionChange) {
      onOptionChange(option);
    }
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="wrap" ref={dropdownRef}>
      <div className={`dropdown${isDropdownOpen ? " hovered" : ""}`}>
        <div className="selected-option" onClick={toggleDropdown}>
          {selectedOption}
          <img
            src="/src/assets/imgs/icons/down-black.png"
            alt="Dropdown"
            className="dropdown-icon"
          />
        </div>
        {isDropdownOpen && (
          <div className="options">
            {options.map((option, index) => (
              <div
                key={index}
                className="option"
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;

// Dropdown component
// @param {Object} props - Component props
// @param {string} [props.value] - The currently selected option value
// @param {string[]} props.options - List of available options
// @param {Function} props.onOptionChange - Callback function called when an option is selected in the dropdown
//
// Usage examples:
// <Dropdown onOptionChange={(option) => console.log("Selected option:", option)} />
