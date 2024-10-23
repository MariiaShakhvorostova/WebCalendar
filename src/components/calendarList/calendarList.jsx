import React, { useState, useEffect } from "react";
import EditCalendarModal from "../editCalendarModel/editCalendarModel";
import "./calendarList.css";
import Checkbox from "../checkbox/checkbox";
import Button from "../button/button";
import Modal from "../modal/modal";

import {
  fetchCalendars,
  createCalendar,
  updateCalendar,
  deleteCalendar,
  updateCalendarCheckbox,
} from "../../api/calendars";

const CalendarList = ({
  userId,
  onCalendarSelect,
  setEvents,
  selectedCalendarIds,
}) => {
  const [calendars, setCalendars] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentCalendar, setCurrentCalendar] = useState({
    id: null,
    title: "",
    color: "",
    isChecked: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const calendarList = await fetchCalendars(userId);
      setCalendars(calendarList);

      const defaultCalendars = calendarList.filter(
        (cal) => cal.title === "Default"
      );
      if (defaultCalendars.length === 0) {
        const newDefaultCalendar = await createCalendar(userId, {
          title: "Default",
          color: "bright-pink",
          isChecked: true,
        });
        setCalendars((prevCalendars) => [...prevCalendars, newDefaultCalendar]);
      } else if (defaultCalendars.length > 1) {
        for (let i = 1; i < defaultCalendars.length; i++) {
          await deleteCalendar(userId, defaultCalendars[i].id);
        }
      }
    };
    fetchData();
  }, [userId]);

  const handleEditClick = (calendar) => {
    setCurrentCalendar(calendar);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (calendar) => {
    if (calendar.title === "Default") {
      return;
    }
    setCurrentCalendar(calendar);
    setIsDeleteModalOpen(true);
  };

  const handleSave = async (updatedCalendar) => {
    let newCalendar;
    if (updatedCalendar.id) {
      newCalendar = await updateCalendar(userId, updatedCalendar);
    } else {
      newCalendar = await createCalendar(userId, updatedCalendar);
    }
    setIsEditModalOpen(false);
    setCurrentCalendar({ id: null, title: "", color: "", isChecked: false });
    setCalendars((prevCalendars) => {
      const existingCalendarIndex = prevCalendars.findIndex(
        (cal) => cal.id === newCalendar.id
      );
      if (existingCalendarIndex !== -1) {
        const updatedCalendars = [...prevCalendars];
        updatedCalendars[existingCalendarIndex] = newCalendar;
        return updatedCalendars;
      } else {
        return [...prevCalendars, newCalendar];
      }
    });
  };

  const handleAddClick = () => {
    setCurrentCalendar({ id: null, title: "", color: "", isChecked: false });
    setIsEditModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (currentCalendar.title === "Default") {
      return;
    }
    await deleteCalendar(userId, currentCalendar.id);
    setIsDeleteModalOpen(false);
    setCurrentCalendar({ id: null, title: "", color: "", isChecked: false });
    setCalendars((prevCalendars) =>
      prevCalendars.filter((cal) => cal.id !== currentCalendar.id)
    );

    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.calendarId !== currentCalendar.id)
    );
  };

  const handleCheckboxChange = async (id, isChecked) => {
    await updateCalendarCheckbox(userId, id, isChecked);
    setCalendars((prevCalendars) =>
      prevCalendars.map((cal) => (cal.id === id ? { ...cal, isChecked } : cal))
    );
    onCalendarSelect({ id, isChecked });

    const updatedSelectedCalendarIds = isChecked
      ? [...selectedCalendarIds, id]
      : selectedCalendarIds.filter((calendarId) => calendarId !== id);

    setEvents((prevEvents) =>
      prevEvents.filter((event) =>
        updatedSelectedCalendarIds.includes(event.calendarId)
      )
    );
  };

  return (
    <div className="calendar-list">
      <div className="h2-button">
        <h2>My calendars</h2>
        <button className="add-button" onClick={handleAddClick}></button>
      </div>
      {calendars.map((calendar) => (
        <div key={calendar.id} className="calendar-item">
          <Checkbox
            backgroundImage={`/src/assets/imgs/colors/${calendar.color}.png`}
            isChecked={calendar.isChecked}
            onChange={(isChecked, event) =>
              handleCheckboxChange(calendar.id, isChecked, event)
            }
          />
          <span>{calendar.title}</span>
          <div className="buttons-group">
            <div className="calendar-actions">
              <img
                src="/src/assets/imgs/delete.png"
                alt="Delete"
                className="delete-icon"
                onClick={(event) => {
                  event.stopPropagation();
                  handleDeleteClick(calendar);
                }}
              />
              <img
                src="/src/assets/imgs/Iconedit-pen.png"
                alt="Edit"
                className="edit-icon"
                onClick={(event) => {
                  event.stopPropagation();
                  handleEditClick(calendar);
                }}
              />
            </div>
          </div>
        </div>
      ))}
      {isEditModalOpen && (
        <EditCalendarModal
          calendar={currentCalendar}
          onSave={handleSave}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
      {isDeleteModalOpen && (
        <Modal
          title="Delete calendar"
          content={`Are you sure you want to delete ${currentCalendar.title}? You'll no longer have access to this calendar and its events.`}
          onClose={() => setIsDeleteModalOpen(false)}
          actions={
            <>
              <Button
                type="secondary"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="primary" onClick={handleDeleteConfirm}>
                Delete
              </Button>
            </>
          }
        />
      )}
    </div>
  );
};

export default CalendarList;
