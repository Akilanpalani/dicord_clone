import App from "next/app";

import "../app/globals.css";
import Navbar from '@/app/nav/Navbar';

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return(
      <>
      <Navbar />
      <Component {...pageProps} />
      </>
    )
  }
}