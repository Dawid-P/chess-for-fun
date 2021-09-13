import React from "react";
import Navbar from "../components/Navbar";
import Main from "../components/Main";
import chessData from "../functions/chessData";
import router from "next/router";

const UserStats = ({ data }) => {
  return (
    <>
      {data.code === 0 ? (
        <>
          <Navbar />
          <h1>Username does not exist, try again</h1>
        </>
      ) : (
        <>
          <Navbar />
          <Main chessData={data} />
        </>
      )}
    </>
  );
};

export async function getServerSideProps({ params, query }) {
  // Fetch data from external API
  let data = null;
  let username = params.id;
  let dateFrom = query.from;
  let dateTo = query.to;

  let response = await fetch(
    `https://api.chess.com/pub/player/${username}/games/archives`
  );
  if (response.ok) {
    let json = await response.json();
    data = await chessData(json, dateFrom, dateTo, username);
  } else {
    data = { error: "User name does not exist", code: 0 };
  }

  // Pass data to the page via props
  return { props: { data } };
}

export default UserStats;
