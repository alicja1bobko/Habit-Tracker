import React, { useEffect, useState } from "react";
import { IUserData, useUser } from "../../context/user-context";
import { countAchieved } from "./Statistics/countAchievedToday";
import { habitsForDay } from "./Statistics/todaysHabits";
import { Avatar } from "@mui/material";

const ProfilePicture = () => {
  const [img, setImg] = useState("");
  const [completed, setCompleted] = useState<number>(0);
  const userData: IUserData | null = useUser();
  const settings: IUserData["settings"] = userData.settings;
  const achievedToday: number = countAchieved(new Date());
  const todaysHabits: string[] = habitsForDay(new Date(), userData.habits);

  // load image from firestore
  useEffect(() => {
    const settingsKey = Object.keys(settings)[0];
    if (settingsKey) setImg(settings[settingsKey].image);
  }, [userData.settings]);

  //fill the progress border around image on completed habits change
  useEffect(() => {
    todaysHabits &&
      setCompleted((achievedToday / Object.keys(todaysHabits).length) * 100);
  }, [todaysHabits, achievedToday, completed]);

  return (
    <div className="p-3  cols-span-1 justify-self-end md:justify-self-start xl:justify-self-center">
      <div className="w-[140px] h-[140px] bg-white rounded-full absolute -translate-x-[5px] -translate-y-[5px] z-20"></div>
      <div
        className="w-[150px] h-[150px] rounded-full absolute -translate-x-[10px] -translate-y-[10px] z-10"
        style={{
          backgroundImage: `conic-gradient(#f05100 ${completed}%,transparent 0%)`,
        }}
      ></div>
      <div className="w-[152px] h-[152px] bg-background-gray rounded-full absolute -translate-x-[11px] -translate-y-[11px] z-5"></div>
      <div className="w-[130px] h-[130px] rounded-full overflow-y-hidden">
        <Avatar
          alt="Avatar profile picture"
          src={img}
          sx={{
            width: 130,
            height: 130,
            zIndex: 20,
          }}
        />
      </div>
    </div>
  );
};

export default ProfilePicture;
