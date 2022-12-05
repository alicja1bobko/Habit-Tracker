import Head from "next/head";
import React, { ReactNode } from "react";
import HeroBackground from "../components/HeroBackground";
import Navbar from "../components/Navbar";

interface Props {
  meta: {
    title: string;
    description: string;
    icon?: string;
  };
  children: ReactNode;
}

const HomepageLayout = ({ children, meta }: Props) => {
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
      <HeroBackground>
        <Navbar />
        <div className="my-auto mx-auto px-8 text-white h-full flex flex-col space-y-10 items-center justify-center text-center z-10 max-w-3xl">
          {children}
        </div>
      </HeroBackground>
    </>
  );
};

export default HomepageLayout;
