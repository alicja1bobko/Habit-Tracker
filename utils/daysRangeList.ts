import { subDays } from "date-fns";

export type selectDay = {
  [key: string]: Date;
};

export const daysList = (num: number) => {
  const locale: Locale = { code: "en-gb" };
  let today = new Date();
  let selectDay: selectDay = {
    ["0"]: today,
  };
  let numDaysAgo = subDays(today, num);

  for (let i = 1; i <= num; i++) {
    let numDaysAgo = subDays(today, i);
    selectDay = {
      ...selectDay,
      [i.toString()]: numDaysAgo,
    };
  }

  return selectDay;
};
