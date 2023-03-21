import Head from "next/head";
import React, { ReactNode } from "react";
import Sidebar from "../components/loggedIn/Sidebar";

interface Props {
  meta: {
    title: string;
    description: string;
    icon?: string;
  };
  children: ReactNode;
}

const DashboardLayout = ({ children, meta }: Props) => {
  const { title, description, icon } = meta;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="keyword"
          content="habit tracker app, javascript, typescript, nextjs, tailwind, firebase"
        />
        <link rel="icon" href={icon || "/favicon.ico"} />
      </Head>
      <div className="bg-[#fcfbf9]">
        <Sidebar children={children} />
      </div>
    </>
  );
};
DashboardLayout.requireAuth = true;
export default DashboardLayout;
