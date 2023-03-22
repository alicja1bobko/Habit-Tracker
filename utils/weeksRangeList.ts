import { endOfWeek, startOfWeek, subWeeks } from "date-fns";

export type selectRange = {
  [key: string]: {
    start: Date;
    end: Date;
  };
};

export const weeksList = (num: Number) => {
  const locale: Locale = { code: "en-gb" };

  let weekStarts = startOfWeek(new Date(), {
    locale: { code: "en-gb" },
    weekStartsOn: 1,
  });

  let weekEnds = endOfWeek(new Date(), {
    locale: { code: "en-gb" },
    weekStartsOn: 1,
  });

  let selectWeeks: selectRange = {
    ["0"]: { start: weekStarts, end: weekEnds },
  };
  
  for (let i = 1; i <= num; i++) {
    let start = subWeeks(weekStarts, i);
    let end = endOfWeek(start, { locale, weekStartsOn: 1 });
    selectWeeks = {
      ...selectWeeks,
      [i.toString()]: { start: start, end: end },
    };
  }
  return selectWeeks;
};
