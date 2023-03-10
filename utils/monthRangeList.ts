import { endOfMonth, startOfMonth, subMonths } from "date-fns";
import { selectRange } from "./weeksRangeList";

export const monthsList = (num: Number) => {
  const locale: Locale = { code: "en-gb" };
  let monthStarts = startOfMonth(new Date());
  let monthEnds = endOfMonth(new Date());
  let selectMonths: selectRange = {
    ["0"]: { start: monthStarts, end: monthEnds },
  };
  for (let i = 1; i <= num; i++) {
    let start = subMonths(monthStarts, i);
    let end = endOfMonth(start);
    selectMonths = {
      ...selectMonths,
      [i.toString()]: { start: start, end: end },
    };
  }
  return selectMonths;
};
