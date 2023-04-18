import { SelectChangeEvent } from "@mui/material";
import { selectRange } from "../../../utils/weeksRangeList";
import DateRangePicker from "../DatePickers/DateRangePicker";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { eachDayOfInterval } from "date-fns";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { IUserData, useUser } from "../../../context/user-context";
import { habitsForDay } from "../Statistics/todaysHabits";
import { countAchieved } from "../Statistics/countAchievedToday";
import { breakpoints } from "./breakpoints";
import { PieChart } from "./PieChart";

type Props = {
  selectedRange: string;
  handleSelect: (event: SelectChangeEvent<string>) => void;
  selectDatesRange: selectRange;
};

const WeekOverview = ({
  selectedRange,
  handleSelect,
  selectDatesRange,
}: Props) => {
  const userData: IUserData | null = useUser();
  const habits = userData.habits;
  let weekOverview = eachDayOfInterval({
    start: selectDatesRange[selectedRange].start,
    end: selectDatesRange[selectedRange].end,
  });

  return (
    <>
      <div className="mt-10">
        <div id="week-overview" className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">Week overview</h2>
          <DateRangePicker
            selectedRange={selectedRange}
            handleSelect={handleSelect}
            selectDatesRange={selectDatesRange}
          />
        </div>

        <Carousel
          customLeftArrow={
            <ArrowLeftIcon className="absolute left-1  max-w-4 cursor-pointer" />
          }
          customRightArrow={
            <ArrowRightIcon className="absolute right-1 max-w-4 cursor-pointer" />
          }
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={breakpoints}
          ssr={true}
          infinite={false}
          autoPlay={false}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          transitionDuration={500}
          containerClass={`flex justify-items-center`}
          removeArrowOnDeviceType={["mobile"]}
        >
          {weekOverview.map((date, index) => {
            let numOfHabits = habitsForDay(date, habits);
            let achieved = countAchieved(date);
            let completed = (achieved / Object.keys(numOfHabits).length) * 100;
            return (
              <PieChart
                key={index}
                day={date.getDate()}
                completed={completed}
              />
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default WeekOverview;
