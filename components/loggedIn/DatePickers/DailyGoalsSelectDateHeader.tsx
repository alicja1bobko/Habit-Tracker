import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import { selectDay } from "../../../utils/daysRangeList";
import { formatDateForSelectDay } from "../../../utils/formatDateForSelect";
import { headerListStyle, listStyle } from "./style";

type Props = {
  selectedDayIndex: string;
  handleSelectDay: (event: SelectChangeEvent<string>) => void;
  selectDayRange: selectDay;
};

const DailyGoalsSelectDateHeader = ({
  selectedDayIndex,
  handleSelectDay,
  selectDayRange,
}: Props) => {
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
          sx={headerListStyle}
          MenuProps={listStyle}
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
