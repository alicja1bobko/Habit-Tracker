import LandingPage from "../components/LandingPage";
import HomepageLayout from "../Layouts/HomepageLayout";
import { ReactElement, ReactNode } from "react";

export default function Home() {
  return <LandingPage />;
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <HomepageLayout
      meta={{
        title: "Habit tracker app",
        description: "Habit tracker app homepage",
      }}
    >
      {page}
    </HomepageLayout>
  );
};
