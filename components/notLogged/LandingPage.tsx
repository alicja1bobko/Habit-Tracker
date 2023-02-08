import Link from "next/link";
import React from "react";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] space-y-10 max-w-4xl mx-auto text-white text-center px-8">
      <h1 className="text-4xl md:text-7xl font-medium capitalize leading-[1.2em]">
        Get your life on track,
        <br /> build golden habits
      </h1>
      <p className="text-lg md:text-2xl max-w-3xl ">
        Habit Tracker helps you build the best version of yourself. With
        beautiful charts and insightful statistics helps you efficiently and
        successfully maintain great habits.
      </p>
      <button className="btn rounded-lg px-7 py-3 bg-blue-700 text-white text-base md:text-xl cursor-pointer shadow-lg hover:bg-blue-800 transition-all ease-in tracking-wider">
        <Link href="/sign-up">Get Started</Link>
      </button>
    </div>
  );
};

export default LandingPage;
