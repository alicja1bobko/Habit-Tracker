export const Day = ({
  dayOfMonth,
  isCompleted,
  streak,
}: {
  dayOfMonth: string;
  isCompleted: boolean;
  streak: boolean;
}) => {
  return (
    <>
      <div
        className="flex-grow border-b border-2 first-of-type:hidden"
        style={{
          borderColor: streak && isCompleted ? "#318a31" : "transparent",
        }}
      ></div>
      <div
        className="rounded-full w-[30px] h-[30px] md:w-[40px] md:h-[40px] justify-center items-center flex text-xs md:text-base"
        style={{
          backgroundColor: isCompleted ? "#318a31" : "#fcfbf9",
          color: isCompleted ? "#ffffff" : "#d3c9b7",
        }}
      >
        {dayOfMonth.split("-")[0]}
      </div>
    </>
  );
};
