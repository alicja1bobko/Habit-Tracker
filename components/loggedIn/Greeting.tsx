import React, { useEffect, useState } from "react";
import { IUserData } from "../../context/user-context";

type Props = {
  settings: IUserData["settings"];
};

let today = new Date();
let hours = today.getHours();
let greeting = "Hello";
if (hours >= 5 && hours <= 11) {
  greeting = "Good morning";
} else if (hours >= 12 && hours <= 17) {
  greeting = "Good afternoon";
} else greeting = "Good evening";

const Greeting = ({ settings }: Props) => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const settingsKey = Object.keys(settings)[0];
    if (settingsKey) {
      let name = settings[settingsKey].firstName;
      if (name !== undefined) setUserName(`, ${name}`);
    }
  }, [settings]);

  return (
    <h2 className="text-3xl font-bold tracking-wide ml-2 mt-2 mb-auto xl:mb-0 xl:ml-0 col-span-1 xl:col-span-4">
      {greeting}
      {userName}!
    </h2>
  );
};

export default Greeting;
