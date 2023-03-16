import { SelectChangeEvent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { selectRange } from "../../utils/weeksRangeList";
import DateRangePicker from "./DateRangePicker";
//@ts-ignore
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { eachDayOfInterval } from "date-fns";

type Props = {
  selectedRange: string;
  handleSelect: (event: SelectChangeEvent<string>) => void;
  selectDatesRange: selectRange;
};
const responsive = {
  large: {
    breakpoint: { max: 3000, min: 1801 },
    items: 7,
    slidesToSlide: 1, // optional, default to 1.
  },
  desktop: {
    breakpoint: { max: 1800, min: 1300 },
    items: 5,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const WeekOverview = ({
  selectedRange,
  handleSelect,
  selectDatesRange,
}: Props) => {
  let weekOverview = eachDayOfInterval({
    start: selectDatesRange[selectedRange].start,
    end: selectDatesRange[selectedRange].end,
  }).map((date) => date.getDate());
  return (
    <>
      <div className="mt-10 mb-8">
        <div id="week-overview" className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">Week overview</h2>
          <DateRangePicker
            selectedRange={selectedRange}
            handleSelect={handleSelect}
            selectDatesRange={selectDatesRange}
          />
        </div>
        <div className="mt-5">
          <Carousel
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
              return <PieChart n={date} />;
            })}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default WeekOverview;

const PieChart = ({ n }: { n: number }) => {
  return (
    <div className="flex p-5 justify-center ">
      <div className="rounded-full w-[80px] h-[80px]  justify-center items-center flex text-xs md:text-base border-solid border-[5px] border-[#f6f5f2]">
        <div
          className="w-[88px] h-[88px]   rounded-full absolute z-5"
          style={{
            backgroundImage: `conic-gradient(#ffa745 ${80}%,transparent 0%)`,
          }}
        ></div>

        <div className="absolute  font-bold text-lg text-[#949494] z-20">
          {n}
        </div>
        <div className="w-[70px] h-[70px] bg-white rounded-full absolute z-10"></div>
      </div>
    </div>
  );
};
