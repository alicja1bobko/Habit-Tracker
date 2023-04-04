import HomepageLayout from "../Layouts/HomepageLayout";
import { ReactElement } from "react";
import type { NextPageWithLayout } from "../pages/_app";
import SignIn from "../components/notLogged/SignIn";

const SignInPage: NextPageWithLayout = () => {
  return <SignIn />;
};

SignInPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <HomepageLayout
      meta={{
        title: "Habit tracker | Sign in",
        description: "Habit tracker app Sign in Page",
      }}
    >
      {page}
    </HomepageLayout>
  );
};

export default SignInPage;
