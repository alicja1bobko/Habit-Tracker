import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IUserData } from "../../context/user-context";

type Props = {
  achievedToday: number;
  todaysHabits: IUserData["habits"];
};

const ProfilePicture = ({ achievedToday, todaysHabits }: Props) => {
  const [completed, setCompleted] = useState<number>(0);
  useEffect(() => {
    todaysHabits &&
      setCompleted((achievedToday / Object.keys(todaysHabits).length) * 100);
  }, [todaysHabits, achievedToday]);

  return (
    <div className="p-3  cols-span-1 justify-self-end md:justify-self-start xl:justify-self-center">
      <div className="w-[140px] h-[140px] bg-white rounded-full absolute -translate-x-[5px] -translate-y-[5px] z-20"></div>
      <div
        className="w-[150px] h-[150px] rounded-full absolute -translate-x-[10px] -translate-y-[10px] z-10"
        style={{
          backgroundImage: `conic-gradient(#f05100 ${completed}%,transparent 0%)`,
        }}
      ></div>
      <div className="w-[152px] h-[152px] bg-[#fcfbf9] rounded-full absolute -translate-x-[11px] -translate-y-[11px] z-5"></div>
      <Image
        alt="Profile photo"
        width={130}
        height={130}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBcg5OV7m4Ojt-6P7o0JwzgBcZosZwisJw0A&usqp=CAU"
        className="rounded-full relative z-20 max-w-none"
      />
    </div>
  );
};

export default ProfilePicture;
