import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import { selectDay } from "../../utils/daysRangeList";
import { formatDateForSelectDay } from "../../utils/formatDateForSelect";

type TDailyGoalsSelectDate = {
  selectedDayIndex: string;
  handleSelectDay: (event: SelectChangeEvent<string>) => void;
  selectDayRange: selectDay;
};

const DailyGoalsSelectDateHeader = ({
  selectedDayIndex,
  handleSelectDay,
  selectDayRange,
}: TDailyGoalsSelectDate) => {
  return (
    <div className="flex justify-between ">
      <h3 className="font-bold text-2xl mb-3 mt-2">Habits</h3>
      <FormControl size="small" className="self-center" sx={{ minWidth: 90 }}>
        <Select
          labelId="select-day-label"
          id="select-day"
          value={selectedDayIndex}
          label="range"
          onChange={handleSelectDay}
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
            ".css-jd1zyo-MuiSelect-select-MuiInputBase-input-MuiInput-input": {
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
          {Object.entries(selectDayRange).map((entry) => {
            let key = entry[0];
            let day = entry[1];
            let formattedDate = formatDateForSelectDay(day);
            return (
              <MenuItem key={key} value={key}>
                {formattedDate}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default DailyGoalsSelectDateHeader;
