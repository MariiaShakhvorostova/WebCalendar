export const calculateRepeatDates = (startDate, repeatOption) => {
  const dates = [];
  const start = new Date(startDate);

  switch (repeatOption) {
    case "Daily":
      for (let i = 1; i <= 7; i++) {
        const nextDate = new Date(start);
        nextDate.setDate(start.getDate() + i);
        dates.push(nextDate);
      }
      break;
    case "Weekly":
      for (let i = 1; i <= 3; i++) {
        const nextDate = new Date(start);
        nextDate.setDate(start.getDate() + i * 7);
        dates.push(nextDate);
      }
      break;
    case "Monthly":
      for (let i = 1; i <= 2; i++) {
        const nextDate = new Date(start);
        nextDate.setMonth(start.getMonth() + i);
        dates.push(nextDate);
      }
      break;
    case "Yearly":
      const nextDate = new Date(start);
      nextDate.setFullYear(start.getFullYear() + 1);
      dates.push(nextDate);
      break;
    default:
      break;
  }

  return dates;
};
