import { DatePicker } from "@mui/x-date-pickers-pro";
import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type Props = {};

const ProgressCalendar = (props: Props) => {
  return (
    <div className="mt-10">
      <Calendar />
    </div>
  );
};

// import dayjs, { Dayjs } from "dayjs";
// import TextField from "@mui/material/TextField";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

// const ProgressCalendar = () => {
//   const [value, setValue] = React.useState<Dayjs | null>(dayjs("2022-04-07"));

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <StaticDatePicker
//         displayStaticWrapperAs="desktop"
//         openTo="year"
//         value={value}
//         onChange={(newValue) => {
//           setValue(newValue);
//         }}
//         renderInput={(params) => <TextField {...params} />}
//       />
//     </LocalizationProvider>
//   );
// };

export default ProgressCalendar;
