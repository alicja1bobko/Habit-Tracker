import React, { ReactElement } from "react";
import HomepageLayout from "../Layouts/HomepageLayout";

type Props = {};

const SignUp = (props: Props) => {
  return <div>SignUp</div>;
};

SignUp.getLayout = function getLayout(page: ReactElement) {
  return (
    <HomepageLayout
      meta={{
        title: "Habit tracker app | Sign up",
        description: "Habit tracker app Sig nup Page",
      }}
    >
      {page}
    </HomepageLayout>
  );
};

export default SignUp;
