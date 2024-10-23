/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./color.css";

const ColorPicker = ({ onColorSelect, value }) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(null);

  const colors = [
    { name: "bright-green", path: "/src/assets/imgs/colors/bright-green.png" },
    { name: "bright-pink", path: "/src/assets/imgs/colors/bright-pink.png" },
    { name: "dark-blue", path: "/src/assets/imgs/colors/dark-blue.png" },
    { name: "dark-violet", path: "/src/assets/imgs/colors/dark-violet.png" },
    { name: "green", path: "/src/assets/imgs/colors/green.png" },
    { name: "light-blue", path: "/src/assets/imgs/colors/light-blue.png" },
    { name: "light-green", path: "/src/assets/imgs/colors/light-green.png" },
    { name: "orange", path: "/src/assets/imgs/colors/orange.png" },
    { name: "pink", path: "/src/assets/imgs/colors/pink.png" },
    { name: "sea", path: "/src/assets/imgs/colors/sea.png" },
    { name: "violet", path: "/src/assets/imgs/colors/violet.png" },
    { name: "yellow", path: "/src/assets/imgs/colors/yellow.png" },
  ];

  useEffect(() => {
    if (value) {
      const index = colors.findIndex((color) => color.name === value);
      if (index !== -1) {
        setSelectedColorIndex(index);
      }
    }
  }, [value, colors]);

  const handleColorSelect = (index) => {
    setSelectedColorIndex(index);
    onColorSelect(colors[index].name);
  };

  return (
    <div className="wrap">
      <div className="color-picker">
        <p className="color-label">Colour</p>
        <div className="color-options">
          {colors.map((color, index) => (
            <img
              key={index}
              src={color.path}
              alt={`Color ${index + 1}`}
              className="color-option"
              style={{
                border:
                  selectedColorIndex === index
                    ? "1px solid rgba(50, 55, 73, 1)"
                    : "none",
                borderRadius: "4px",
                padding: "1px",
              }}
              onClick={() => handleColorSelect(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;

// ColorPicker component
// @param {Object} props - Component props
// @param {Function} props.onColorSelect - Callback function called when a color is selected in the color picker
// @param {string} [props.value] - The value of the selected color. If provided, the color with this value will be highlighted.
//
// Usage examples:
// <ColorPicker onColorSelect={(color) => console.log("Selected color:", color)} />
