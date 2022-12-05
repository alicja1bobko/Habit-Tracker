import Link from "next/link";
import React from "react";

const LandingPage = () => {
  return (
    <>
      <h1 className="text-4xl md:text-6xl font-medium capitalize leading-[1.2em]">
        Get your life on track,
        <br /> build golden habits
      </h1>
      <p className="text-lg md:text-xl ">
        Habit Tracker helps you build the best version of yourself. With
        beautiful charts and insightful statistics helps you efficiently and
        successfully maintain great habits.
      </p>
      <Link href="/sign-up">
        <button className="rounded-lg px-7 py-3 bg-blue-700 text-white text-base md:text-lg cursor-pointer shadow-lg hover:bg-blue-800 transition-all ease-in tracking-wider">
          Get Started
        </button>
      </Link>
    </>
  );
};

export default LandingPage;
