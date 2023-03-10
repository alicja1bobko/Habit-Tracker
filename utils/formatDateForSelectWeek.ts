import { format } from "date-fns";
import { enGB } from "date-fns/locale";

export const formatDateForSelectWeek = (weekStart: Date, weekEnd: Date) => {
  return ` ${format(weekStart, "LLLdd", { locale: enGB })} - ${format(
    weekEnd,
    "LLLdd",
    { locale: enGB }
  )}`;
};
