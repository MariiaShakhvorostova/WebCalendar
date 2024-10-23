/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "./icons.css";

const IconComponent = ({ iconName }) => {
  return (
    <div className="wrap">
      <div className="icon-container">
        {iconName && (
          <img
            src={`/src/assets/imgs/icons/${iconName}.png`}
            className="icon-img"
            alt={iconName}
          />
        )}
      </div>
    </div>
  );
};

export default IconComponent;

// IconComponent component
// @param {Object} props - Component props
// @param {string} [props.iconName] - The name of the icon to display
//
// Usage examples:
// <IconComponent iconName="car" />
