import React from "react";
import { weekdaysTable } from "../../utils/weekdays";
type Props = {};

const WeekdaysHeader = (props: Props) => {
  return (
    <div className="progress-calendar-grid">
      <div></div>
      <div className="flex justify-between ">
        {Object.values(weekdaysTable).map((weekday, i) => {
          return (
            <p
              key={i}
              className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] justify-center items-center flex uppercase font-semibold text-sm text-[#949494]"
            >
              {weekday}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default WeekdaysHeader;
