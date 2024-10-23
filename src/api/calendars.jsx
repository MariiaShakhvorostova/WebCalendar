import { db } from "../../firebase";
import {
  collection,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  query,
  where,
  writeBatch,
} from "firebase/firestore";

export const fetchCalendars = async (userId) => {
  const q = query(collection(db, "calendars"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const calendars = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return calendars;
};

export const createCalendar = async (userId, calendar) => {
  if (!userId) throw new Error("User ID is required to create a calendar.");

  const id = Date.now().toString();
  const calendarDoc = doc(db, "calendars", id);
  await setDoc(calendarDoc, { ...calendar, id, userId });
  return { ...calendar, id, userId };
};

export const deleteCalendar = async (userId, id) => {
  if (!userId) throw new Error("User ID is required to delete a calendar.");

  const calendarDoc = doc(db, "calendars", id);
  const eventsQuery = query(
    collection(db, "events"),
    where("calendarId", "==", id),
    where("userId", "==", userId)
  );
  const eventsSnapshot = await getDocs(eventsQuery);
  const batch = writeBatch(db);
  eventsSnapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();
  await deleteDoc(calendarDoc);
};

export const updateCalendar = async (userId, calendar) => {
  if (!userId) throw new Error("User ID is required to update a calendar.");

  const calendarDoc = doc(db, "calendars", calendar.id);
  await updateDoc(calendarDoc, { ...calendar, userId });
  return calendar;
};

export const updateCalendarCheckbox = async (userId, id, isChecked) => {
  if (!userId)
    throw new Error("User ID is required to update calendar checkbox.");

  const calendarDoc = doc(db, "calendars", id);
  await updateDoc(calendarDoc, { isChecked, userId });
};
