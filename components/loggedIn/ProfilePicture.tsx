import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IUserData } from "../../context/user-context";

type Props = {
  achievedToday: number;
  todaysHabits: string[];
  settings: IUserData["settings"];
};

const ProfilePicture = ({ achievedToday, todaysHabits, settings }: Props) => {
  const [img, setImg] = useState(
    "https://lionsyouthbrass.band/wp-content/uploads/2022/05/Profile.jpg"
  );
  const [completed, setCompleted] = useState<number>(0);

  // load image from firestore
  useEffect(() => {
    const settingsKey = Object.keys(settings)[0];
    if (settingsKey) setImg(settings[settingsKey].image);
  }, [settings]);

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
      <div className="w-[152px] h-[152px] bg-[#fcfbf9] rounded-full absolute -translate-x-[11px] -translate-y-[11px] z-5"></div>
      <Image
        alt="Profile photo"
        width={130}
        height={130}
        src={img}
        placeholder="blur"
        blurDataURL={"/../../public/assets/anonymous.jpg"}
        onErrorCapture={() => setImg("/../public/assets/anonymous.jpg")}
        className="rounded-full relative z-20 max-w-none"
      />
    </div>
  );
};

export default ProfilePicture;
