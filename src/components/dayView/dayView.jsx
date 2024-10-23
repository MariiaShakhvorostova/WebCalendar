/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./dayView.css";
import { fetchEvents, deleteEvent } from "../../api/events";
import CurrentTimeLine from "../currentTimeLine/CurrentTimeLine";
import EventInformationModal from "../eventInfModal/eventInfModal";

const HOUR_HEIGHT = 81;
const MINUTES_IN_HOUR = 60;

const DayView = ({
  userId,
  selectedDate,
  events,
  setEvents,
  onEventEdit,
  selectedCalendarIds,
  onEventCreate,
}) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentTimeVisible, setCurrentTimeVisible] = useState(false);

  useEffect(() => {
    const now = new Date();
    setCurrentTimeVisible(true);
  }, []);

  const times = Array.from({ length: 24 }, (_, i) => {
    const hour = i < 10 ? "0" + i : i;
    return `${hour}:00`;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsData = await fetchEvents(userId);
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error.message, error.code);
      }
    };
    fetchData();
  }, [userId]);

  const filteredEvents = selectedCalendarIds
    ? events.filter((event) => selectedCalendarIds.includes(event.calendarId))
    : events;

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleDelete = async (eventId) => {
    try {
      await deleteEvent(userId, eventId);
      setEvents(events.filter((event) => event.id !== eventId));
      setSelectedEvent(null);
    } catch (error) {
      console.error("Error deleting event:", error.message, error.code);
    }
  };

  const closeEventInformationModal = () => {
    setSelectedEvent(null);
  };

  const handleCellClick = (startTime) => {
    const [startHour] = startTime.split(":");
    const endHour = parseInt(startHour, 10) + 1;
    const endTime = `${endHour < 10 ? "0" + endHour : endHour}:00`;

    onEventCreate(selectedDate, startTime, endTime);
  };

  const calculateEventHeight = (startTime, endTime) => {
    const [startHour, startMinute] = startTime.split(":");
    const [endHour, endMinute] = endTime.split(":");

    const startHourNum = parseInt(startHour, 10);
    const startMinuteNum = parseInt(startMinute, 10);
    const endHourNum = parseInt(endHour, 10);
    const endMinuteNum = parseInt(endMinute, 10);

    const totalStartMinutes = startHourNum * MINUTES_IN_HOUR + startMinuteNum;
    const totalEndMinutes = endHourNum * MINUTES_IN_HOUR + endMinuteNum;
    const totalMinutes = totalEndMinutes - totalStartMinutes;

    return (totalMinutes / MINUTES_IN_HOUR) * HOUR_HEIGHT;
  };

  const calculateEventTop = (startTime) => {
    const [startHour, startMinute] = startTime.split(":");
    const startHourNum = parseInt(startHour, 10);
    const startMinuteNum = parseInt(startMinute, 10);

    const totalMinutes = startMinuteNum;

    return (totalMinutes / MINUTES_IN_HOUR) * HOUR_HEIGHT;
  };

  const getBackgroundColor = (iconColor) => {
    switch (iconColor) {
      case "dark-blue":
        return "#8383bc";
      case "bright-pink":
        return "#e7a4da";
      case "bright-green":
        return "#85946f";
      case "dark-violet":
        return "#8c6c9b";
      case "green":
        return "#79a479";
      case "light-blue":
        return "#8abae9";
      case "light-green":
        return "#639f79";
      case "orange":
        return "#e0c289";
      case "pink":
        return "#ffc0cb";
      case "sea":
        return "#699d80";
      case "violet":
        return "#e8aae8";
      case "yellow":
        return "#fcfcaa";
      default:
        return "transparent";
    }
  };

  return (
    <div className="day-view">
      <table>
        <thead>
          <tr>
            <th className="today">
              <div className="today-content">
                <div>
                  {selectedDate
                    ? selectedDate
                        .toLocaleDateString("en-US", { weekday: "short" })
                        .toUpperCase()
                    : ""}
                </div>
                <div>{selectedDate ? selectedDate.getDate() : ""}</div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {times.map((time, index) => {
            const currentHour = new Date().getHours();
            const isCurrentHour = time.includes(`${currentHour}:00`);

            return (
              <tr key={index}>
                <td>{time}</td>
                <td
                  className="event-cell"
                  onClick={(e) => {
                    e.stopPropagation();
                    const cellEvent = filteredEvents.find((event) => {
                      const [eventStartHour] = event.startTime.split(":");
                      return (
                        event.date ===
                          (selectedDate
                            ? selectedDate.toISOString().split("T")[0]
                            : "") && parseInt(eventStartHour, 10) === index
                      );
                    });

                    if (cellEvent) {
                      handleEventClick(cellEvent);
                    } else {
                      handleCellClick(time);
                    }
                  }}
                  style={{ position: "relative" }}
                >
                  {filteredEvents
                    .filter(
                      (event) =>
                        event.date ===
                          (selectedDate
                            ? selectedDate.toISOString().split("T")[0]
                            : "") &&
                        parseInt(event.startTime.split(":")[0], 10) === index
                    )
                    .map((event, i) => {
                      const backgroundColor = getBackgroundColor(
                        event.calendarIconColor
                      );
                      const eventHeight = calculateEventHeight(
                        event.startTime,
                        event.endTime
                      );
                      const eventTop = calculateEventTop(event.startTime);

                      return (
                        <div
                          key={i}
                          className="event"
                          onClick={() => handleEventClick(event)}
                          style={{
                            backgroundColor: `${backgroundColor}4D`,
                            height: `${eventHeight}px`,
                            top: `${eventTop}px`,
                            position: "absolute",
                            width: "100%",
                          }}
                        >
                          {event.title}
                          <div
                            style={{
                              backgroundImage: `url(/src/assets/imgs/colors/${event.calendarIconColor}.png)`,
                              backgroundColor: backgroundColor,
                            }}
                            className="vertical-line day-line"
                          ></div>
                        </div>
                      );
                    })}
                  {isCurrentHour && currentTimeVisible && <CurrentTimeLine />}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {selectedEvent && (
        <EventInformationModal
          event={selectedEvent}
          onClose={closeEventInformationModal}
          onEdit={() => onEventEdit(selectedEvent)}
          onDelete={() => handleDelete(selectedEvent.id)}
        />
      )}
    </div>
  );
};

export default DayView;
