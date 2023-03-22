import { SelectChangeEvent } from "@mui/material";
import { MouseEvent } from "react";
import { selectRange } from "../../utils/weeksRangeList";
import DateRangePicker from "./DateRangePicker";

type TCalendarDateRange = {
  selectedRange: string;
  handleSelect: (event: SelectChangeEvent<string>) => void;
  handleSelectedCalendarView: (
    event: MouseEvent<HTMLButtonElement>,
    value: boolean
  ) => void;
  selectDatesRange: selectRange;
  weekView: boolean;
};

export const CalendarDateRange = ({
  selectedRange,
  handleSelect,
  selectDatesRange,
  weekView,
  handleSelectedCalendarView,
}: TCalendarDateRange) => {
  return (
    <>
      <div className="progress-layout">
        <h2 className="text-2xl font-bold  self-center grid-in-[top-left] xl:grid-in-[progress]">
          Progress
        </h2>
        <button
          className="text-lg text-left self-end grid-in-[bottom-left] xl:grid-in-[week] xl:text-left font-semibold cursor-pointer underline underline-offset-[19px]"
          style={{
            color: weekView ? "black" : "#949494",
            textDecoration: weekView ? "underline" : "none",
            textDecorationThickness: "2px",
          }}
          onClick={(e) => handleSelectedCalendarView(e, true)}
        >
          Week view
        </button>
        <button
          className="text-lg text-left xl:text-center self-end grid-in-[bottom-right] xl:grid-in-[month] font-semibold cursor-pointer underline underline-offset-[19px]"
          style={{
            color: weekView ? "#e2e1e0" : "black",
            textDecoration: weekView ? "none" : "underline",
            textDecorationThickness: "2px",
          }}
          onClick={(e) => handleSelectedCalendarView(e, false)}
        >
          Month view
        </button>
        <DateRangePicker
          selectedRange={selectedRange}
          handleSelect={handleSelect}
          selectDatesRange={selectDatesRange}
        />
      </div>
      <hr />
    </>
  );
};
