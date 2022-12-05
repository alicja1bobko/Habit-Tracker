import React from "react";
import SignUp from "../components/SignUp";
import HomepageLayout from "../Layouts/HomepageLayout";

type Props = {};

const SignUpPage = (props: Props) => {
  return (
    <HomepageLayout
      meta={{
        title: "Habit tracker app",
        description: "Habit tracker app homepage",
      }}
    >
      <div className="bg-slate-100">
        <SignUp />
      </div>
    </HomepageLayout>
  );
};

export default SignUpPage;
