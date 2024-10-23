/* eslint-disable react/prop-types */
import "./checkbox.css";
import { useState, useEffect } from "react";

const Checkbox = ({
  onChange,
  checkboxText,
  backgroundImage,
  color,
  isChecked: initialChecked,
}) => {
  const [isChecked, setIsChecked] = useState(initialChecked);

  useEffect(() => {
    setIsChecked(initialChecked);
  }, [initialChecked]);

  const handleCheckboxChange = (event) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    if (onChange) {
      onChange(checked);
    }
  };

  return (
    <div className="wrap">
      <label className="checkbox-label">
        <input
          type="checkbox"
          className="checkbox-input"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span
          className={`checkbox-span ${isChecked ? "checked" : ""}`}
          style={{
            backgroundColor: color,
            backgroundImage: isChecked
              ? `url(${backgroundImage})`
              : "url(/src/assets/imgs/check.png)",
          }}
        >
          {isChecked && <span className="approved-icon"></span>}
        </span>
        <span className="checkbox-text">{checkboxText}</span>
      </label>
    </div>
  );
};

export default Checkbox;
// Checkbox component
// @param {Object} props - Component props
// @param {boolean} [props.value=false] - The value of the checkbox
// @param {Function} props.onChange - Callback function called when the checkbox state changes
// @param {string} [props.checkboxText=""] - Text to be displayed next to the checkbox
//
// Usage examples:
// <Checkbox onChange={(event) => console.log("Checkbox changed", event.target.checked)} />
// <Checkbox onChange={(event) => console.log("Checkbox changed", event.target.checked)} checkboxText="Agree to terms" />
