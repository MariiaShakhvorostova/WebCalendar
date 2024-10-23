/* eslint-disable react/prop-types */
import classNames from "classnames";
import "./button.css";

const Button = ({ type, disabled, onClick, children }) => {
  const buttonClass = classNames({
    button: type !== "secondary" && type !== "secondary-longer",
    longer: type === "longer" || type === "secondary-longer",
    "secondary-button": type === "secondary" || type === "secondary-longer",
    disabled: disabled,
  });

  const iconClass = classNames({
    "grey-icon": (type === "longer" || type === "secondary-longer") && disabled,
    icon: type === "longer" || type === "secondary-longer",
    "dark-icon": type === "secondary-longer" && disabled,
    "black-icon": type === "secondary-longer",
  });

  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled}>
      {iconClass && <div className={iconClass}></div>}
      {children}
    </button>
  );
};

export default Button;
