/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { forwardRef } from "react";
import "./textarea.css";

const Textarea = forwardRef(
  ({ value, onChange, rows, cols, maxLength }, ref) => {
    const handleChange = (event) => {
      const inputValue = event.target.value;
      if (maxLength && inputValue.length > maxLength) {
        return;
      }
      onChange(inputValue);
    };

    const valueLength = value ? value.length : 0;

    return (
      <div className={`textarea-wrapper`}>
        <p>Description</p>
        <textarea
          className="textarea"
          value={value}
          onChange={handleChange}
          rows={rows}
          cols={cols}
          maxLength={maxLength}
          ref={ref}
        />
        {maxLength && (
          <div className="maxlength-counter">
            {valueLength}/{maxLength}
          </div>
        )}
        <div className="line"></div>
      </div>
    );
  }
);

export default Textarea;
