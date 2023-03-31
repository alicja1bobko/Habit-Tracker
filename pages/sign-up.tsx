import SignUp from "../components/notLogged/SignUp";
import HomepageLayout from "../Layouts/HomepageLayout";
import React, { ReactElement } from "react";
import type { NextPageWithLayout } from "../pages/_app";

const SignUpPage: NextPageWithLayout = () => {
  return <SignUp />;
};

SignUpPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <HomepageLayout
      meta={{
        title: "Habit tracker | Sign up",
        description: "Habit tracker app Sign up Page",
      }}
    >
      {page}
    </HomepageLayout>
  );
};

export default SignUpPage;
