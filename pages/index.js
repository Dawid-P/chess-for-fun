import Navbar from "../components/Navbar";
import Main from "../components/Main";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Chess for Fun</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      <Main />
    </>
  );
}
