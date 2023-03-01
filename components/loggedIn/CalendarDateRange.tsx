import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { formatDateForSelectWeek } from "../../utils/formatDateForSelectWeek";

type TCalendarDateRange = {
  selectedWeek: string;
  handleSelect: (event: SelectChangeEvent<string>) => void;
  selectWeekRange: {
    [key: string]: {
      start: Date;
      end: Date;
    };
  };
};

export const CalendarDateRange = ({
  selectedWeek,
  handleSelect,
  selectWeekRange,
}: TCalendarDateRange) => {
  return (
    <>
      <div className="progress-layout">
        <h2 className="text-2xl font-bold self-center grid-in-[top-left] xl:grid-in-[progress]">
          Progress
        </h2>
        <div className="text-lg self-end grid-in-[bottom-left] xl:grid-in-[week] ">
          Week view
        </div>
        <div className="text-lg self-end grid-in-[bottom-right] xl:grid-in-[month]">
          Month view
        </div>
        <FormControl
          size="small"
          className="grid-in-[top-right] self-end justify-self-end xl:grid-in-[select]"
          sx={{ minWidth: 135 }}
        >
          <Select
            labelId="select-dates-range-label"
            id="select-dates-range"
            value={selectedWeek}
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
            {Object.entries(selectWeekRange).map((entry) => {
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
