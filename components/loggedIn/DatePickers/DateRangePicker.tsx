import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import { formatDateForSelectWeek } from "../../../utils/formatDateForSelect";
import { selectRange } from "../../../utils/weeksRangeList";
import { headerListStyle, listStyle } from "./style";

type Props = {
  selectedRange: string;
  handleSelect: (event: SelectChangeEvent<string>) => void;
  selectDatesRange: selectRange;
};

export const DateRangePicker = ({
  selectedRange,
  handleSelect,
  selectDatesRange,
}: Props) => {
  return (
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
        sx={headerListStyle}
        MenuProps={listStyle}
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
  );
};

export default DateRangePicker;
