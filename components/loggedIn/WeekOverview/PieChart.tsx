export const PieChart = ({
  day,
  completed,
}: {
  day: number;
  completed: number;
}) => {
  return (
    <div className="flex p-5 justify-center ">
      <div className="rounded-full w-[80px] h-[80px]  justify-center items-center flex text-xs md:text-base border-solid border-[5px] border-light-gray">
        <div
          className="w-[88px] h-[88px]   rounded-full absolute z-5"
          style={{
            backgroundImage: `conic-gradient(#ffa745 ${completed}%,transparent 0%)`,
          }}
        ></div>

        <div className="absolute  font-bold text-lg text-dark-graphite  z-20">
          {day}
        </div>
        <div className="w-[70px] h-[70px] bg-white rounded-full absolute z-10"></div>
      </div>
    </div>
  );
};
