import { lightFormat, eachDayOfInterval } from "date-fns";
import { IUserData } from "../../context/user-context";

const ProgressCalendar = ({
  habits,
  checkmarks,
  weekStart,
  weekEnd,
}: {
  habits: IUserData["habits"];
  checkmarks: IUserData["checkmarks"];
  weekStart: Date;
  weekEnd: Date;
}) => {
  // Get dates that are currently selected
  const selectedDates = eachDayOfInterval({
    start: weekStart,
    end: weekEnd,
  }).map((date) => lightFormat(date, "d-M-yyy"));

  const habitsKeys = Object.keys(habits);
  const habitNames = habitsKeys.map((key) => habits[key].name);
  const checkmarkKeys = Object.keys(checkmarks);

  // Transform db into object with dates as keys and habits as values
  interface IWeeklyHabits {
    [key: string]: {
      [key: string]: boolean;
    };
  }
  let weeklyHabits: IWeeklyHabits = {};

  selectedDates.map((day) => {
    checkmarkKeys.map((key) => {
      if (checkmarks[key].date == day) {
        let habitId = checkmarks[key].habitId;
        let habitName = habits[habitId].name;
        weeklyHabits[day] = {
          ...weeklyHabits[day],
          [`${habitName}`]: checkmarks[key].completed,
        };
      }
    });
  });

  return (
    <>
      <div className="flex-col ">
        {habitNames.map((habitName, index) => {
          return (
            <div className="grid grid-cols-[25%_auto] xl:grid-cols-[25%_auto] gap-5 pt-4 ">
              <div key={index}>{habitName}</div>
              <div className="flex gap-1 justify-between">
                {selectedDates.map((day) => {
                  let isCompleted = false;
                  if (weeklyHabits[day] !== undefined) {
                    isCompleted =
                      typeof Object.keys(weeklyHabits[day]).find(
                        (key) => key == habitName
                      ) !== undefined
                        ? weeklyHabits[day][habitName]
                        : false;
                  }
                  return (
                    <Day
                      key={`${day} ${habitName}`}
                      dayOfMonth={day}
                      isCompleted={isCompleted}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

const Day = ({
  dayOfMonth,
  isCompleted,
}: {
  dayOfMonth: string;
  isCompleted: boolean;
}) => {
  return (
    <div
      className="rounded-full w-[40px] h-[40px] justify-center items-center flex"
      style={{
        backgroundColor: isCompleted ? "#318a31" : "#fcfbf9",
        color: isCompleted ? "#ffffff" : "#d3c9b7",
      }}
    >
      {dayOfMonth.split("-")[0]}
    </div>
  );
};

export default ProgressCalendar;
