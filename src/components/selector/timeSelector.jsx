/* eslint-disable react/prop-types */
import "./selector.css";

const hoursInDay = 24;
const minutesInHour = 60;
const minutStep = 15;

const TimeSelector = ({
  selectedTime,
  isMenuOpen,
  onTimeSelect,
  toggleMenu,
}) => {
  const handleTimeSelect = (time) => {
    onTimeSelect(time);
    toggleMenu();
  };

  const renderTimeOptions = () => {
    const timeOptions = [];
    for (let hours = 0; hours < hoursInDay; hours++) {
      for (let minutes = 0; minutes < minutesInHour; minutes += minutStep) {
        const ampm = hours < 12 ? "am" : "pm";
        const time = `${String(hours).padStart(2, "0")}:${String(
          minutes
        ).padStart(2, "0")} ${ampm}`;
        timeOptions.push(
          <div
            key={time}
            className={`time-option${
              selectedTime === time ? " selected-time" : ""
            }`}
            onClick={() => handleTimeSelect(time)}
          >
            {time}
          </div>
        );
      }
    }
    return timeOptions;
  };

  return (
    <div className="wrap">
      <div className="selected-menu">
        <p className="time-label">Time</p>
        <div className="selector" onClick={toggleMenu}>
          {selectedTime || "Select time"}
        </div>
        <div className="black-line"></div>
        {isMenuOpen && (
          <div className="time-options">{renderTimeOptions()}</div>
        )}
      </div>
    </div>
  );
};

export default TimeSelector;

// TimeSelector component
// @param {Object} props - Component props
// @param {string} props.selectedTime - The currently selected time
// @param {boolean} props.isMenuOpen - Indicates whether the time selector menu is open or closed
// @param {function} props.onTimeSelect - Callback function triggered when a time is selected
// @param {function} props.toggleMenu - Callback function to toggle the visibility of the time selector menu
