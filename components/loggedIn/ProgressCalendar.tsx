import { lightFormat, eachDayOfInterval } from "date-fns";
import { IUserData } from "../../context/user-context";
import { weekdaysTable } from "../../utils/weekdays";
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

  const checkIfHabitCompleted = (day: string, habitName: string) => {
    let isCompleted = false;
    if (weeklyHabits[day] !== undefined) {
      isCompleted =
        typeof Object.keys(weeklyHabits[day]).find(
          (key) => key == habitName
        ) !== undefined
          ? weeklyHabits[day][habitName]
          : false;
    }
    return isCompleted;
  };

  return (
    <>
      <div className="flex-col ">
        <div className="grid grid-cols-[25%_auto] xl:grid-cols-[25%_auto] gap-5 pt-4 ">
          <div></div>
          <div className="flex  justify-between ">
            {Object.values(weekdaysTable).map((weekday) => {
              return (
                <p className="w-[40px] h-[40px] justify-center items-center flex uppercase font-semibold text-sm text-[#949494]">
                  {weekday}
                </p>
              );
            })}
          </div>
        </div>
        {habitNames.map((habitName, index) => {
          return (
            <div className="grid grid-cols-[25%_auto] xl:grid-cols-[25%_auto] gap-5 pt-4 ">
              <div key={index} className="font-semibold">
                {habitName}
              </div>
              <div className="">
                <div className="flex justify-between items-center ">
                  {selectedDates.map((day, i, arr) => {
                    let streak = false;
                    if (i > 0) {
                      let previousDay = arr[i - 1];
                      streak = checkIfHabitCompleted(previousDay, habitName);
                    }
                    let isCompleted = checkIfHabitCompleted(day, habitName);
                    return (
                      <Day
                        key={`${day} ${habitName}`}
                        dayOfMonth={day}
                        isCompleted={isCompleted}
                        streak={streak}
                      />
                    );
                  })}
                </div>
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
        className="rounded-full w-[40px] h-[40px] justify-center items-center flex"
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

export default ProgressCalendar;
