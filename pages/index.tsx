import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, selectValue } from "../slices/counterSlice";
import type { RootState } from "../store";
import Layout from "./unLogged/Layout.jsx";
import Navbar from "../components/Navbar";

export default function Home() {
  const count = useSelector(selectValue);
  const dispatch = useDispatch();

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
      {/* Navbar */}
      <Navbar />
    </Layout>
  );
}
