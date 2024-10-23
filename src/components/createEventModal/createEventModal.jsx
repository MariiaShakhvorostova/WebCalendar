import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Datepicker from "../datepicker/date";
import TimeSelector from "../selector/timeSelector";
import Button from "../button/button";
import Dropdown from "../dropdown/dropdown";
import Checkbox from "../checkbox/checkbox";
import DropdownCalendars from "../dropdownCalendars/dropdownCalendars";
import Textarea from "../textarea/textarea";
import { db } from "../../../firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import "./createEventModal.css";
import { createEvent } from "../../api/events";
import useAppStore from "../../useAppStore";
import { fetchCalendars } from "../../api/calendars";

const eventSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Title must be 50 characters or less"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  calendar: z.string().min(1, "Please select a calendar"),
  description: z
    .string()
    .max(200, "Description must be 200 characters or less")
    .optional(),
  isAllDay: z.boolean().optional(),
  repeat: z.string().default("Does not repeat"),
});

const DateDropdown = ({ selectedDate, onDateChange }) => {
  const [visible, setVisible] = useState(false);
  const datePickerRef = useRef(null);

  const handleDateChange = (date) => {
    onDateChange(date);
    setVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [datePickerRef]);

  const formattedDate = selectedDate
    ? `${selectedDate.toLocaleDateString()} (${selectedDate.toLocaleDateString("en-US", { weekday: "long" })})`
    : "Select Date";

  return (
    <div className="date-dropdown" ref={datePickerRef}>
      <div className="dropdown-header" onClick={() => setVisible(!visible)}>
        <img
          src="/src/assets/imgs/clock.png"
          alt="Clock Icon"
          className="clock-icon"
        />
        <span className="selected-date create-add-form">{formattedDate}</span>
      </div>
      {visible && (
        <Datepicker value={selectedDate} onChange={handleDateChange} />
      )}
    </div>
  );
};

const CreateEventModal = ({
  userId,
  onClose,
  onEventAdded,
  selectedDate,
  calendars,
  initialEventData = null,
  onEventUpdated,
  selectedStartTime,
  selectedEndTime,
}) => {
  const [eventDate, setEventDate] = useState(
    initialEventData
      ? new Date(initialEventData.date)
      : selectedDate || new Date()
  );
  const [isStartTimeMenuOpen, setIsStartTimeMenuOpen] = useState(false);
  const [isEndTimeMenuOpen, setIsEndTimeMenuOpen] = useState(false);
  const [selectedCalendar, setSelectedCalendar] = useState(
    initialEventData
      ? {
          id: initialEventData.calendarId,
          color: initialEventData.calendarIconColor,
          title: initialEventData.calendar,
        }
      : { color: "", title: "Choose calendar" }
  );

  const [isAllDay, setIsAllDay] = useState(
    initialEventData ? initialEventData.isAllDay : false
  );

  const { setCalendars } = useAppStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: initialEventData ? initialEventData.title : "",
      startTime: initialEventData
        ? initialEventData.startTime
        : selectedStartTime,
      endTime: initialEventData ? initialEventData.endTime : selectedEndTime,
      calendar: initialEventData ? initialEventData.calendar : "",
      description: initialEventData ? initialEventData.description : "",
      isAllDay: initialEventData ? initialEventData.isAllDay : false,
      repeat: initialEventData ? initialEventData.repeat : "Does not repeat",
    },
  });

  useEffect(() => {
    setValue("startTime", selectedStartTime);
    setValue("endTime", selectedEndTime);
  }, [selectedStartTime, selectedEndTime, setValue]);

  useEffect(() => {
    const fetchAndSetCalendars = async () => {
      const newCalendars = await fetchCalendars(userId);
      setCalendars(newCalendars);
    };
    fetchAndSetCalendars();
  }, [setCalendars, userId]);

  const repeatOptions = [
    "Does not repeat",
    "Daily",
    "Weekly",
    "Monthly",
    "Yearly",
  ];

  const onSubmit = async (data) => {
    const eventDetails = {
      ...data,
      date: eventDate.toISOString().split("T")[0],
      calendar: selectedCalendar.title,
      calendarIconColor: selectedCalendar.color,
      calendarId: selectedCalendar.id,
      isAllDay: isAllDay,
      repeat: data.repeat,
    };

    try {
      if (initialEventData) {
        await updateDoc(doc(db, "events", initialEventData.id), eventDetails);
        onEventUpdated({ ...eventDetails, id: initialEventData.id });
      } else {
        const createdEvents = await createEvent(userId, eventDetails);
        createdEvents.forEach((event) => onEventAdded(event));

        const newCalendars = await fetchCalendars(userId);
        setCalendars(newCalendars);
      }
      onClose();
    } catch (error) {
      console.error("Error saving event to Firebase:", error.message);
      alert(`Error saving event: ${error.message}`);
    }
  };

  return (
    <div
      className="modal-background"
      onClick={(event) =>
        event.target.classList.contains("modal-background") && onClose()
      }
    >
      <div className="create-event-modal">
        <div className="modal-header">
          <h2>{initialEventData ? "Edit event" : "Create event"}</h2>
          <button className="close-button" onClick={onClose}></button>
        </div>
        <div className="create-line"></div>
        <div className="edit-calendar-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-create-group">
              <div className="title-create-icon"></div>
              <label className="title-label add-title">Title</label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    placeholder="Enter title"
                    className="form-control add-title create-add-form"
                  />
                )}
              />
              {errors.title && (
                <span className="error-message err-title">
                  {errors.title.message}
                </span>
              )}
            </div>
            <div className="form-create-group add-date-time">
              <div className="form-create-group">
                <label className="title-label add-title">Date</label>
                <DateDropdown
                  selectedDate={eventDate}
                  onDateChange={setEventDate}
                />
              </div>
              <div className="form-create-group add-time">
                <label className="title-label add-time-label">Time</label>
                <div className="time-selectors">
                  <Controller
                    name="startTime"
                    control={control}
                    render={({ field }) => (
                      <TimeSelector
                        selectedTime={field.value}
                        onTimeSelect={field.onChange}
                        isMenuOpen={isStartTimeMenuOpen}
                        toggleMenu={() =>
                          setIsStartTimeMenuOpen(!isStartTimeMenuOpen)
                        }
                        placeholder="Start Time"
                      />
                    )}
                  />
                  <span>—</span>
                  <Controller
                    name="endTime"
                    control={control}
                    render={({ field }) => (
                      <TimeSelector
                        selectedTime={field.value}
                        onTimeSelect={field.onChange}
                        isMenuOpen={isEndTimeMenuOpen}
                        toggleMenu={() =>
                          setIsEndTimeMenuOpen(!isEndTimeMenuOpen)
                        }
                        placeholder="End Time"
                        initialStartTime={watch("startTime")}
                      />
                    )}
                  />
                </div>

                {errors.startTime && (
                  <span className="error-message err-start">
                    {errors.startTime.message}
                  </span>
                )}
                {errors.endTime && (
                  <span className="error-message err-end">
                    {errors.endTime.message}
                  </span>
                )}
              </div>
            </div>
            <div className="form-create-group check-allDay">
              <Checkbox
                backgroundImage={`/src/assets/imgs/green-check.png`}
                isChecked={isAllDay}
                onChange={() => setIsAllDay(!isAllDay)}
                checkboxText="All day"
              />
              <div className="wrap-repeat">
                <Controller
                  name="repeat"
                  control={control}
                  render={({ field }) => (
                    <Dropdown
                      value={field.value}
                      options={repeatOptions}
                      onOptionChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>

            <div className="form-create-group add-cal-dropdown">
              <div className="calendar-icon"></div>
              <div className="cal-title-dropdown">
                <label className="title-label">Calendar</label>
                <Controller
                  name="calendar"
                  control={control}
                  render={({ field }) => (
                    <DropdownCalendars
                      options={calendars}
                      selectedOption={selectedCalendar}
                      onOptionChange={(option) => {
                        setSelectedCalendar(option);
                        field.onChange(option.title);
                      }}
                    />
                  )}
                />
                {errors.calendar && (
                  <span className="error-message err-calendar">
                    {errors.calendar.message}
                  </span>
                )}
              </div>
            </div>
            <div className="form-create-group form-textarea">
              <div className="icon-textarea"></div>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea {...field} rows={3} cols={40} maxLength={200} />
                )}
              />
              {errors.description && (
                <span className="error-message">
                  {errors.description.message}
                </span>
              )}
            </div>
            <div className="modal-buttons">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEventModal;
