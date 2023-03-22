export const weekdaysTable: { [key: string]: string } = {
  0: "Mo",
  1: "Tu",
  2: "We",
  3: "Thu",
  4: "Fr",
  5: "Sa",
  6: "Su",
};

export const normaliZeWeekdayFromDate = (date: Date) => {
  // new Date().getDay() returns 0 for Sunday 1 for Monday and so on..
  let weekday = date.getDay();
  if (weekday === 0) return 6;
  else return weekday - 1;
};
