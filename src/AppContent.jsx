import React from "react";
import Header from "./components/header/header";
import Button from "./components/button/button";
import Datepicker from "./components/datepicker/date";
import CalendarList from "./components/calendarList/calendarList";
import CentralCalendar from "./components/centralCalendar/centralCalendar";
import CreateEventModal from "./components/createEventModal/createEventModal";
import "./App.css";
import useAppStore from "./useAppStore";
import { fetchEvents } from "./api/events";

function AppContent() {
  const {
    calendars,
    setCalendars,
    selectedDate,
    setSelectedDate,
    selectedView,
    setSelectedView,
    isCreateEventModalOpen,
    setIsCreateEventModalOpen,
    events,
    setEvents,
    selectedEvent,
    setSelectedEvent,
    selectedCalendarIds,
    setSelectedCalendarIds,
    user,
    setSelectedStartTime,
    selectedStartTime,
    setSelectedEndTime,
    selectedEndTime,
  } = useAppStore((state) => ({
    calendars: state.calendars,
    setCalendars: state.setCalendars,
    selectedDate: state.selectedDate,
    setSelectedDate: state.setSelectedDate,
    selectedView: state.selectedView,
    setSelectedView: state.setSelectedView,
    isCreateEventModalOpen: state.isCreateEventModalOpen,
    setIsCreateEventModalOpen: state.setIsCreateEventModalOpen,
    events: state.events,
    setEvents: state.setEvents,
    selectedEvent: state.selectedEvent,
    setSelectedEvent: state.setSelectedEvent,
    selectedCalendarIds: state.selectedCalendarIds,
    setSelectedCalendarIds: state.setSelectedCalendarIds,
    user: state.user,
    setSelectedStartTime: state.setSelectedStartTime,
    selectedStartTime: state.selectedStartTime,
    setSelectedEndTime: state.setSelectedEndTime,
    selectedEndTime: state.selectedEndTime,
  }));

  const handleCalendarSelect = async ({ id, isChecked }) => {
    const updatedSelectedCalendarIds = isChecked
      ? [...selectedCalendarIds, id]
      : selectedCalendarIds.filter((calendarId) => calendarId !== id);

    setSelectedCalendarIds(updatedSelectedCalendarIds);

    const newEvents = await fetchEvents(user.uid);
    setEvents(
      newEvents.filter((event) =>
        updatedSelectedCalendarIds.includes(event.calendarId)
      )
    );
  };

  const handleEditCalendar = (updatedCalendar) => {
    setCalendars((prevCalendars) =>
      prevCalendars.map((calendar) =>
        calendar.id === updatedCalendar.id ? updatedCalendar : calendar
      )
    );
  };

  const handleDeleteCalendar = (calendarId) => {
    setCalendars((prevCalendars) =>
      prevCalendars.filter((calendar) => calendar.id !== calendarId)
    );
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.calendarId !== calendarId)
    );
  };

  const handleAddCalendar = (newCalendar) => {
    setCalendars((prevCalendars) => [...prevCalendars, newCalendar]);
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleViewChange = (newView) => {
    setSelectedView(newView);
  };

  const handleTodayClick = () => {
    const today = new Date();
    setSelectedDate(today);
    setSelectedView("Day");
  };

  const handleCreateEventModalOpen = () => {
    setSelectedEvent(null);
    setIsCreateEventModalOpen(true);
  };

  const handleEventAdded = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setIsCreateEventModalOpen(false);
  };

  const handleEventUpdated = (updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
    setIsCreateEventModalOpen(false);
  };

  const handleEventEdit = (event) => {
    setSelectedEvent(event);
    setIsCreateEventModalOpen(true);
  };

  const handleEventCreate = (date, startTime, endTime) => {
    setSelectedDate(date);
    setSelectedStartTime(startTime);
    setSelectedEndTime(endTime);
    setSelectedEvent(null);
    setIsCreateEventModalOpen(true);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <>
      <Header
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedView={selectedView}
        onViewChange={setSelectedView}
        onTodayClick={() => {
          const today = new Date();
          setSelectedDate(today);
          setSelectedView("Day");
        }}
      />
      <div className="button-container">
        <Button
          type={"longer"}
          disabled={false}
          onClick={() => {
            setSelectedEvent(null);
            setIsCreateEventModalOpen(true);
          }}
        >
          Create
        </Button>
      </div>
      <Datepicker value={selectedDate} onChange={setSelectedDate} />
      <CalendarList
        userId={user.uid}
        calendars={calendars}
        onEdit={handleEditCalendar}
        onDelete={handleDeleteCalendar}
        onAdd={handleAddCalendar}
        onCalendarSelect={handleCalendarSelect}
        setEvents={setEvents}
        selectedCalendarIds={selectedCalendarIds}
      />
      <CentralCalendar
        userId={user.uid}
        date={selectedDate}
        view={selectedView}
        events={events}
        setEvents={setEvents}
        onEventEdit={handleEventEdit}
        selectedCalendarIds={selectedCalendarIds}
        onEventCreate={handleEventCreate}
      />
      {isCreateEventModalOpen && (
        <CreateEventModal
          userId={user.uid}
          selectedDate={selectedDate}
          onClose={() => setIsCreateEventModalOpen(false)}
          onEventAdded={handleEventAdded}
          onEventUpdated={handleEventUpdated}
          initialEventData={selectedEvent}
          calendars={calendars}
          selectedStartTime={selectedStartTime}
          selectedEndTime={selectedEndTime}
        />
      )}
    </>
  );
}

export default AppContent;
