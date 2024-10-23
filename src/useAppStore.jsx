import { create } from "zustand";
import { fetchCalendars } from "./api/calendars";
import { fetchEvents } from "./api/events";

const useAppStore = create((set) => ({
  calendars: [],
  selectedDate: new Date(),
  selectedView: "Week",
  isCreateEventModalOpen: false,
  events: [],
  selectedEvent: null,
  selectedCalendarIds: [],
  user: null,
  selectedStartTime: null,
  selectedEndTime: null,

  setCalendars: (calendars) => set({ calendars }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setSelectedView: (view) => set({ selectedView: view }),
  setIsCreateEventModalOpen: (isOpen) =>
    set({ isCreateEventModalOpen: isOpen }),
  setEvents: (events) => {
    if (Array.isArray(events)) {
      set({ events });
    } else if (typeof events === "function") {
      set((state) => ({ events: events(state.events) }));
    } else {
      console.error(
        "Expected events to be an array or function, but got:",
        events
      );
    }
  },
  setSelectedEvent: (event) => set({ selectedEvent: event }),
  setSelectedCalendarIds: (ids) => set({ selectedCalendarIds: ids }),
  setUser: (user) => set({ user }),
  setSelectedStartTime: (time) => set({ selectedStartTime: time }),
  setSelectedEndTime: (time) => set({ selectedEndTime: time }),

  fetchInitialData: async (userId) => {
    try {
      const calendarList = await fetchCalendars(userId);
      set({ calendars: calendarList });

      const checkedCalendarIds = calendarList
        .filter((calendar) => calendar.isChecked)
        .map((calendar) => calendar.id);
      set({ selectedCalendarIds: checkedCalendarIds });

      if (checkedCalendarIds.length > 0) {
        const eventsData = await fetchEvents(userId);
        if (Array.isArray(eventsData)) {
          set({ events: eventsData });
        } else {
          console.error("Expected events to be an array, but got:", eventsData);
          set({ events: [] });
        }
      }
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  },

  updateEvent: (updatedEvent) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      ),
    })),

  addEvent: (newEvent) =>
    set((state) => ({
      events: [...state.events, newEvent],
    })),
}));

export default useAppStore;
