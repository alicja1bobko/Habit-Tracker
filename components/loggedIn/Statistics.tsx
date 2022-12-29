import React from "react";

type Props = {
  header: string;
  text: string;
  stat: number;
  habit?: string;
};

const Statistics = ({ header, text, stat, habit }: Props) => {
  return (
    <div className="flex flex-col p-6 m-3  bg-[#fcfbf9] rounded-3xl w-full lg:w-1/2 xl:w-full">
      <h3 className="font-bold ">{header}</h3>
      <p className="mt-4 font-bold text-[#b9b8b8] whitespace-nowrap">
        <span className="text-[#f05100] text-lg">{stat}</span> {text}{" "}
        {habit && <span className="capitalize text-black">{habit}</span>}
      </p>
    </div>
  );
};

export default Statistics;
