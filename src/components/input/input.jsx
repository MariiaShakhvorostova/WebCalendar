/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./input.css";

const Input = ({
  label,
  placeholder,
  type,
  disabled,
  error,
  value,
  onChange,
  iconVisible,
}) => {
  const [showPass, setShowPass] = useState(false);

  const togglePassVisible = () => {
    setShowPass((prev) => !prev);
  };

  return (
    <div
      className={`wrap ${disabled ? "disabled" : ""} ${error ? "error" : ""}`}
    >
      <div className="pass-container">
        <div className="pass-line">
          <p className={`inp-names ${disabled ? "disabled" : ""}`}>{label}</p>
          <input
            label={label}
            type={
              type === "password" ? (showPass ? "text" : "password") : "text"
            }
            className={`inputs ${disabled ? "disabled" : ""}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
          />
          <p className={`line ${error ? "error" : ""}`}></p>
          {error && <p className="error-message">{error}</p>}
        </div>
        {iconVisible && (
          <div className="box-icon">
            <input
              type="checkbox"
              id="showPass"
              className="toggle-pass"
              onChange={togglePassVisible}
            />
            <label htmlFor="showPass" className="pass-icon">
              <img
                className="eye-icon"
                src={
                  showPass
                    ? "/src/assets/imgs/icons/opened-eye.png"
                    : "/src/assets/imgs/icons/closed-eye.png"
                }
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;

// Input component
// @param {Object} props - Component props
// @param {string} [props.label] - The label for the input
// @param {string} [props.placeholder] - The placeholder text for the input
// @param {string} [props.type] - The type of the input (e.g., "text", "password")
// @param {boolean} [props.disabled] - Whether the input is disabled or not
// @param {string} [props.error] - Error message to display below the input
// @param {string} [props.value] - The value of the input
// @param {function} [props.onChange] - The function to call when the input value changes
// @param {boolean} [props.iconVisible] - Whether to show an icon for password visibility
//
// Usage examples:
// <Input label="Username*" placeholder="Enter your username" type="text" disabled={false} error="" value="" onChange={() => {}} iconVisible={false} />
