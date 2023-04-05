import { addDays, differenceInDays, startOfDay, subDays } from "date-fns";
import { IUserData } from "../../../context/user-context";

type countBestStreakFn = (
  checkmarks: IUserData["checkmarks"],
  habits: IUserData["habits"]
) => [string, number];

const formatDate = (date: string) => {
  return new Date(date.split("-").reverse().join("-"));
};

const relativeDates = () => ({
  today: startOfDay(new Date()),
  yesterday: startOfDay(subDays(new Date(), 1)),
  tomorrow: startOfDay(addDays(new Date(), 1)),
});

// based on https://github.com/jonsamp/date-streaks code

export const countBestStreak: countBestStreakFn = (checkmarks, habits) => {
  const { today, yesterday } = relativeDates();
  const habitKeys = Object.keys(habits);

  // group checkmarks by habit keys and for each habit return key and longest streak

  const summary: [string, number][] = habitKeys.map((habitKey) => {
    const filtered = Object.entries(checkmarks).filter(
      ([key, value]) => value.habitId === habitKey
    );

    let sortedByDates = filtered
      .sort(function (a, b) {
        return Number(formatDate(b[1].date)) - Number(formatDate(a[1].date));
      })
      .reverse();

    const result = sortedByDates.reduce(
      (acc, arr, index) => {
        const first = formatDate(arr[1].date);
        const second = sortedByDates[index + 1]
          ? formatDate(sortedByDates[index + 1][1].date)
          : first;
        const diff = differenceInDays(second, first);
        const firstIsCompleted = arr[1].completed;
        const secondIsCompleted = sortedByDates[index + 1]
          ? sortedByDates[index + 1][1].completed
          : false;
        let streak = diff === 1 && firstIsCompleted && secondIsCompleted;

        const isToday: boolean =
          acc.isToday || differenceInDays(first, today) === 0;
        const isYesterday =
          acc.isYesterday || differenceInDays(first, yesterday) === 0;

        if (streak) ++acc.streaks[acc.streaks.length - 1];
        if (diff === 1 && firstIsCompleted && !secondIsCompleted)
          acc.streaks.push(1);

        return {
          ...acc,
          longestStreak: Math.max(...acc.streaks),
          currentStreak:
            isToday || isYesterday ? acc.streaks[acc.streaks.length - 1] : 0,
          isYesterday,
          isToday,
        };
      },
      {
        currentStreak: 0,
        longestStreak: 0,
        streaks: [1],
        isToday: false,
        isYesterday: false,
      }
    );
    return [habitKey, result.longestStreak];
  });

  let habitKeyMaxValuePair = summary.reduce(
    ([i, max], [key, value]) => {
      return max >= value - 1 ? [i, max] : [key, value];
    },
    ["", 0]
  );

  return [habits[habitKeyMaxValuePair[0]]?.name, habitKeyMaxValuePair[1]];
};
