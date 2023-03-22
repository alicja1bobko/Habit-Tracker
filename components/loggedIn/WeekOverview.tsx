import { SelectChangeEvent } from "@mui/material";
import { selectRange } from "../../utils/weeksRangeList";
import DateRangePicker from "./DateRangePicker";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { eachDayOfInterval } from "date-fns";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { IUserData } from "../../context/user-context";
import { habitsForDay } from "./Statistics/todaysHabits";
import { countAchieved } from "./Statistics/countAchievedToday";

type Props = {
  selectedRange: string;
  handleSelect: (event: SelectChangeEvent<string>) => void;
  selectDatesRange: selectRange;
  checkmarks: IUserData["checkmarks"];
  habits: IUserData["habits"];
};
const responsive = {
  large: {
    breakpoint: { max: 3000, min: 1801 },
    items: 7,
    slidesToSlide: 1,
  },
  desktop: {
    breakpoint: { max: 1800, min: 1300 },
    items: 5,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
    slidesToSlide: 1,
  },
};

const WeekOverview = ({
  selectedRange,
  handleSelect,
  selectDatesRange,
  checkmarks,
  habits,
}: Props) => {
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
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={false}
          autoPlay={false}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          transitionDuration={500}
          containerClass={`flex justify-items-center`}
          removeArrowOnDeviceType={["mobile"]}
          dotListClass=""
          itemClass={``}
        >
          {weekOverview.map((date) => {
            let numOfHabits = habitsForDay(date, habits);
            let achieved = countAchieved(checkmarks, date);
            let completed = (achieved / Object.keys(numOfHabits).length) * 100;
            return <PieChart day={date.getDate()} completed={completed} />;
          })}
        </Carousel>
      </div>
    </>
  );
};

export default WeekOverview;

const PieChart = ({ day, completed }: { day: number; completed: number }) => {
  return (
    <div className="flex p-5 justify-center ">
      <div className="rounded-full w-[80px] h-[80px]  justify-center items-center flex text-xs md:text-base border-solid border-[5px] border-[#f6f5f2]">
        <div
          className="w-[88px] h-[88px]   rounded-full absolute z-5"
          style={{
            backgroundImage: `conic-gradient(#ffa745 ${completed}%,transparent 0%)`,
          }}
        ></div>

        <div className="absolute  font-bold text-lg text-[#949494] z-20">
          {day}
        </div>
        <div className="w-[70px] h-[70px] bg-white rounded-full absolute z-10"></div>
      </div>
    </div>
  );
};
