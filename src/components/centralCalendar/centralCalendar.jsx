/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import DayView from "../dayView/dayView";
import WeekView from "../weekView/weekView";
import "./cenralCalendal.css";

const CentralCalendar = ({
  date,
  view,
  events,
  setEvents,
  onEventEdit,
  selectedCalendarIds,
  userId,
  onEventCreate,
}) => {
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [selectedDayOfWeek, setSelectedDayOfWeek] = useState("");

  const handleDaySelect = (selectedDate) => {
    setSelectedDay(selectedDate);
    setSelectedDayOfWeek(
      selectedDate.toLocaleDateString("en-US", { weekday: "long" })
    );
  };

  return (
    <div className="central-calendar">
      {view === "Day" ? (
        <DayView
          selectedDate={date}
          events={events}
          setEvents={setEvents}
          onEventEdit={onEventEdit}
          selectedCalendarIds={selectedCalendarIds}
          userId={userId}
          onEventCreate={onEventCreate}
        />
      ) : (
        <WeekView
          selectedDate={date}
          onDaySelect={handleDaySelect}
          events={events}
          setEvents={setEvents}
          onEventEdit={onEventEdit}
          selectedCalendarIds={selectedCalendarIds}
          userId={userId}
          onEventCreate={onEventCreate}
        />
      )}
    </div>
  );
};

export default CentralCalendar;
