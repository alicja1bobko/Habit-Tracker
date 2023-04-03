import { Goal } from "./Goal";

interface IDailyGoals {
  habits: {
    [key: string]: {
      name: string;
      description: string;
      frequency: Array<number>;
    };
  };
  checkmarks: {
    [key: string]: {
      habitId: string;
      date: string;
      completed: boolean;
    };
  };
  loading: boolean;
}

const DailyGoals = ({ habits, checkmarks, loading }: IDailyGoals) => {
  const habitsKeys = Object.keys(habits);
  const checkmarksKeys = Object.keys(checkmarks);
  let noHabitsForSelectedDay =
    habitsKeys.length === 0 || checkmarksKeys.length === 0;

  if (noHabitsForSelectedDay) {
    return <p className="italic mt-2">No habits for today</p>;
  }
  if (!loading) {
    const checkmarkKeys = Object.keys(checkmarks);
    const habitsList = habitsKeys.map((habitKey, index) => {
      let checkmarkKey = checkmarkKeys.find((key) => {
        return checkmarks[key].habitId == habitKey;
      }) as string;

      let completed = checkmarks[checkmarkKey]?.completed;
      return (
        <Goal
          habit={habits[habitKey]}
          key={index}
          checkmarkKey={checkmarkKey}
          isCompleted={completed}
        />
      );
    });
    return <>{habitsList}</>;
  } else {
    return <p>Loading...</p>;
  }
};

export { DailyGoals };
