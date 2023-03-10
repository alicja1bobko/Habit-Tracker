import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { MouseEvent } from "react";
import { formatDateForSelectWeek } from "../../utils/formatDateForSelect";
import { selectRange } from "../../utils/weeksRangeList";

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
        <FormControl
          size="small"
          className="grid-in-[top-right] self-end justify-self-end xl:grid-in-[select]"
          sx={{ minWidth: 135 }}
        >
          <Select
            labelId="select-dates-range-label"
            id="select-dates-range"
            value={selectedRange}
            label="range"
            onChange={handleSelect}
            variant="standard"
            disableUnderline
            sx={{
              fontWeight: "light",
              boxShadow: "none",
              ".MuiOutlinedInput-notchedOutline": { border: 0 },
              ".MuiSelect-select": {
                "&:focus": { backgroundColor: "transparent" },
                fontWeight: 600,
                color: "#949494",
              },
              ".css-jd1zyo-MuiSelect-select-MuiInputBase-input-MuiInput-input":
                {
                  padding: 0,
                },
            }}
            MenuProps={{
              sx: {
                "&& .Mui-selected": {
                  backgroundColor: "rgba(49, 138, 49,0.4)",
                  "&:hover": { backgroundColor: "rgba(49, 138, 49,0.3)" },
                },
              },
            }}
          >
            {Object.entries(selectDatesRange).map((entry) => {
              let key = entry[0];
              let { start, end } = entry[1];
              let formattedDateRange = formatDateForSelectWeek(start, end);
              return (
                <MenuItem key={key} value={key}>
                  {formattedDateRange}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <hr />
    </>
  );
};
