// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "./toast.css";
import { useToast } from "./toastProvider";

const Toast = () => {
  const { events, deleteEvent } = useToast();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (events.length > 0) {
      const timer = setTimeout(() => {
        deleteEvent(events[0].id);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [events, deleteEvent]);

  const handleDelete = (event) => {
    deleteEvent(event);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`toast${isHovered ? " hovered" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="events">
        {events.map((event) => (
          <div
            key={event.id}
            className={`event${event.showDeletedMessage ? " deleted" : ""}`}
          >
            {event.showDeletedMessage ? "Event deleted" : event.text}
            <img
              src="/src/assets/imgs/x.png"
              alt="Delete"
              className="delete-icon"
              onClick={() => handleDelete(event.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toast;
