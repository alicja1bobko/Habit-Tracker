import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "./unLogged/Layout.jsx";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Habit tracker app</title>
        <meta name="description" content="Habit tracker app" />
        <meta
          name="keyword"
          content="habit tracker app, javascript, typescript, nextjs, tailwind, firebase"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Hero />
    </Layout>
  );
}
