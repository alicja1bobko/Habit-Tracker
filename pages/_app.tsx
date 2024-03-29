import '../styles/globals.css'
import type { AppProps } from "next/app";
import React, { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { AppProviders } from "../context";
import { AuthGuard } from "../context/auth-context";
import Router from "next/router";
import NProgress from "nprogress";
import "../styles/page-loader.css";

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());  


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  requireAuth?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <AppProviders>
      {Component.requireAuth ? (
        <AuthGuard>
          <>{getLayout(<Component {...pageProps} />)}</>
        </AuthGuard>
      ) : (
        getLayout(<Component {...pageProps} />)
      )}
    </AppProviders>
  );
}
