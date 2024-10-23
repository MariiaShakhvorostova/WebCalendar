/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "./eventInfModal.css";

const EventInformationModal = ({ event, onClose, onEdit, onDelete }) => {
  const handleEditClick = () => {
    onEdit();
  };
  const handleBackgroundClick = (event) => {
    if (event.target.classList.contains("eventInfBackgr")) {
      onClose();
    }
  };

  const formatEventTime = (event) => {
    const dateOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };
    const formattedDate = new Date(event.date).toLocaleDateString(
      "en-US",
      dateOptions
    );

    const timeString = event.isAllDay ? "All day" : "";

    return `${formattedDate}, ${event.startTime} - ${event.endTime}, ${timeString}`;
  };

  const eventTimeDetails = event.isAllDay
    ? `${formatEventTime(event)}, ${event.repeat}`
    : `${formatEventTime(event)}\n${event.repeat}`;

  const calendarIconUrl = `/src/assets/imgs/colors/${event.calendarIconColor}.png`;

  return (
    <div className="eventInfBackgr" onClick={handleBackgroundClick}>
      <div className="event-information-modal">
        <div className="modal-content">
          <div className="inf-header">
            <h2>Event Information</h2>
            <div className="buttons-inf">
              <img
                src="/src/assets/imgs/Iconedit-pen.png"
                alt="Edit"
                className="edit-inf"
                onClick={handleEditClick}
              />
              <img
                src="/src/assets/imgs/delete.png"
                alt="Delete"
                className="delete-inf"
                onClick={() => onDelete(event.id)}
              />
              <button className="close-inf" onClick={onClose}></button>
            </div>
          </div>
          <div className="inf-line"></div>

          <div className="modal-body">
            <div className="event-detail">
              <div className="title-inf-icon"></div>
              <span className="inf-title">{event.title}</span>
            </div>
            <div className="event-detail event-time">
              <img
                src="/src/assets/imgs/clock.png"
                alt="Clock Icon"
                className="clock-icon"
              />
              <span>{eventTimeDetails}</span>
            </div>
            <div className="event-detail">
              <div className="calendar-inf-icon"></div>
              <div
                className="inf-calendar-icon"
                style={{ backgroundImage: `url(${calendarIconUrl})` }}
              ></div>
              <span className="calendar-title-span">{event.calendar}</span>
            </div>
            <div className="event-detail">
              <div className="icon-inf-textarea"></div>
              <span>{event.description}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventInformationModal;
