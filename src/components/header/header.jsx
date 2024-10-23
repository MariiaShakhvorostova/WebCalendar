/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/button";
import Dropdown from "../dropdown/dropdown";
import { auth } from "../../../firebase";
import "./header.css";

const Header = ({
  selectedDate,
  setSelectedDate,
  selectedView,
  onViewChange,
  onTodayClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [username, setUsername] = useState("");
  const [showExit, setShowExit] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/welcome");
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUsername(user.displayName);
    }
  }, []);

  useEffect(() => {
    setSelectedDate(new Date());
  }, [setSelectedDate]);

  useEffect(() => {
    let timer;
    if (isHovered) {
      setShowExit(true);
      clearTimeout(timer);
    } else {
      timer = setTimeout(() => {
        setShowExit(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isHovered]);

  const changeMonth = (increment) => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + increment);
      return newDate;
    });
  };

  const handleOptionChange = (option) => {
    if (onViewChange) {
      onViewChange(option);
    }
  };

  return (
    <div className="header">
      <div className="header-content">
        <div className="group__1">
          <div className="logo"></div>
          <Button disabled={false} type="default" onClick={onTodayClick}>
            Today
          </Button>
          <div className="nav">
            <button
              className="nav-button minus"
              onClick={() => changeMonth(-1)}
            ></button>
            <button
              className="nav-button plus"
              onClick={() => changeMonth(1)}
            ></button>
            <span className="current-month">
              {selectedDate.toLocaleString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
        <div className="group__2">
          <Dropdown
            value={selectedView}
            options={["Day", "Week"]}
            onOptionChange={handleOptionChange}
          />
          <div
            className="user-info"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span>{username}</span>
            <div className="user-avatar"></div>
          </div>
          <div className="button-exit">
            <div className={`icon-exit ${showExit ? "visible" : ""}`}></div>
            <button
              className={`log-out ${showExit ? "visible" : ""}`}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
