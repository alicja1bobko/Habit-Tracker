import React from "react";

const Hero = () => {
  return (
    <div className="my-auto mx-auto px-8 text-white h-full flex flex-col space-y-10 items-center justify-center text-center z-10 max-w-3xl ">
      <h1 className="text-4xl md:text-6xl font-medium capitalize leading-[1.2em]">
        Get your life on track,
        <br /> build golden habits
      </h1>
      <p className="text-lg md:text-xl ">
        Habit Tracker helps you build the best version of yourself. With
        beautiful charts and insightful statistics helps you efficiently and
        successfully maintain great habits.
      </p>
      <button className="rounded-lg px-7 py-3 bg-blue-700 text-white text-base md:text-lg cursor-pointer shadow-lg hover:bg-blue-800 transition-all ease-in tracking-wider">
        Get Started
      </button>
    </div>
  );
};

export default Hero;
