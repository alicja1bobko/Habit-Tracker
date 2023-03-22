import React from "react";

type Props = {
  header: string;
  text: string;
  stat: number;
  habit?: string;
};

const Statistics = ({ header, text, stat, habit }: Props) => {
  return (
    <div className="p-6 md:m-3  bg-[#fcfbf9] rounded-3xl w-full lg:col-span-1 xl:w-full col-span-2">
      <h3 className="font-bold ">{header}</h3>
      <p className="mt-4 font-bold text-[#b9b8b8]">
        <span className="text-[#f05100] text-lg">{stat}</span> {text}
        {stat == 1 ? "" : "s"}
        {habit && (
          <>
            <span>{" of "}</span>
            <span className="capitalize text-black">{habit}</span>
          </>
        )}
      </p>
    </div>
  );
};

export default Statistics;
