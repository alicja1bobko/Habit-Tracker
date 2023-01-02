import LandingPage from "../components/LandingPage";
import HomepageLayout from "../Layouts/HomepageLayout";
import { ReactElement } from "react";
import type { NextPageWithLayout } from "./_app";


const Home: NextPageWithLayout = () => {
  // const \{ loading } = useAuth();
  // if (loading) return null;
  return <LandingPage />;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <HomepageLayout
      meta={{
        title: "Habit tracker",
        description: "Habit tracker app homepage",
      }}
    >
      {page}
    </HomepageLayout>
  );
};

export default Home;
