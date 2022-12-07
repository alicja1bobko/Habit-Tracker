import SignUp from "../components/SignUp";
import HomepageLayout from "../Layouts/HomepageLayout";
import React, { ReactElement, ReactNode } from "react";
import type { NextPageWithLayout } from "../pages/_app";

const SignUpPage: NextPageWithLayout = () => {
  return <SignUp />;
};

SignUpPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <HomepageLayout
      meta={{
        title: "Habit tracker app | Sign up",
        description: "Habit tracker app Sign up Page",
      }}
    >
      {page}
    </HomepageLayout>
  );
};

export default SignUpPage;
