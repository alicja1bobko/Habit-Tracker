import '../styles/globals.css'
import type { AppProps } from "next/app";
import React, { ReactElement, ReactNode } from "react";
import { NextPage } from "next";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const layout = getLayout(<Component {...pageProps} />);
  return <React.Fragment>{layout}</React.Fragment>;
}
