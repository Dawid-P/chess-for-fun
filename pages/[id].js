import React from "react";
import Navbar from "../components/Navbar";
import Main from "../components/Main";
import chessData from "../functions/chessData";

const UserStats = ({ data }) => {
  console.log(data);
  return (
    <>
      <Navbar />
      <h1>My data is very long: {data.length}</h1>
      <Main />
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
    console.log(json.archives.length, username, dateFrom, dateTo);
    data = await chessData(json, dateFrom, dateTo, username);
    console.log("Data in [id].js:  ", data.length);
  } else {
    console.log("Username does not exist, try again");
  }

  // Pass data to the page via props
  return { props: { data } };
}

export default UserStats;
