import Head from "next/head";
import React, { ReactNode } from "react";
import HeroBackground from "../components/notLogged/HeroBackground";
import Navbar from "../components/notLogged/Navbar";

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
        <div className="z-10">
          <Navbar />
          {children}
        </div>
      </HeroBackground>
    </>
  );
};

export default HomepageLayout;
