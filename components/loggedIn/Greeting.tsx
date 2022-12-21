import React from "react";

type Props = {};
let name = "Anastasia";

const Greeting = (props: Props) => {
  let today = new Date();
  let hours = today.getHours();
  let greeting = "Hello";
  if (hours >= 5 && hours <= 11) {
    greeting = "Good morning";
  } else if (hours >= 12 && hours <= 17) {
    greeting = "Good afternoon";
  } else greeting = "Good evening";

  return (
    <div className="text-3xl font-bold tracking-wide mb-10">
      {greeting}, {name}!
    </div>
  );
};

export default Greeting;
