import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Main from "../components/Main";
import chessData from "../functions/chessData";
import router from "next/router";
import Head from "next/head";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChess } from "@fortawesome/free-solid-svg-icons";
const pgnParser = require("pgn-parser");

const UserStats = ({ data, username }) => {
  let [dataIsReady, setDataIsReady] = useState(0);
  let [finalData, setFinalData] = useState([]);

  let slicedData = data;
  let id = 1;

  // Extract all games for months selected by user
  const fetcher = async (url) => fetch(url).then((res) => res.json());

  async function sequentialCall(slicedData) {
    setDataIsReady(0);
    setFinalData([]);
    // Variables
    let games = [];
    let allGames = [];

    for (let item of slicedData) {
      games = await fetcher(item);
      allGames.push(...games.games);
    }

    structureChessData(allGames);

    addRatingChange(allGames);

    setFinalData(allGames);
  }

  const matchDate = (ts) => {
    // ts = timestamp of endmatch from api
    // returns date obj
    let result = new Date(ts * 1000).toISOString().slice(0, 10);
    return result;
  };
  // Structure data for frontend
  async function structureChessData(allGames) {
    for (let item of allGames) {
      let [pgnView] = pgnParser.parse(item.pgn);
      item.ECO = pgnView.headers[9].value;
      item.opening = pgnView.headers[10].value;
      item.id = id;
      delete item.pgn;
      item.user = username.toLowerCase();
      item.matchDate = matchDate(item.end_time);

      if (item.white.username.toLowerCase() === username) {
        item.userColor = "white";
        item.userResult = item.white.result;
        item.userRating = item.white.rating;
        item.opponent = item.black;
        item.result = item.white.result;
      }
      if (item.black.username.toLowerCase() === username) {
        item.userColor = "black";
        item.userResult = item.black.result;
        item.userRating = item.black.rating;
        item.opponent = item.white;
        item.result = item.black.result;
      }
      delete item.black;
      delete item.white;
      item.accuracies && delete item.accuracies;
      id++;
    }
  }

  // Add rating change data
  async function addRatingChange(allGames) {
    // Arrays with each time class
    let timeClassArrays = { bullet: [], blitz: [], rapid: [], daily: [] };
    for (let item of allGames) {
      item.time_class === "bullet" && timeClassArrays.bullet.push(item);
      item.time_class === "blitz" && timeClassArrays.blitz.push(item);
      item.time_class === "rapid" && timeClassArrays.rapid.push(item);
      item.time_class === "daily" && timeClassArrays.daily.push(item);
    }

    // Loop thorugh each array and add a rating change property
    for (let arr in timeClassArrays) {
      for (let item of timeClassArrays[arr]) {
        let indexOfMatchBefore = timeClassArrays[arr].indexOf(item) - 1;
        let ratingAfter = item.userRating;
        let ratingBefore = ratingAfter;
        if (indexOfMatchBefore !== -1) {
          ratingBefore = timeClassArrays[arr][indexOfMatchBefore].userRating;
        }

        let difference = ratingAfter - ratingBefore;
        item.userRatingChange = difference;
      }
    }
    allGames = [
      ...timeClassArrays.bullet,
      ...timeClassArrays.blitz,
      ...timeClassArrays.rapid,
      ...timeClassArrays.daily,
    ];
  }

  useEffect(() => {
    sequentialCall(slicedData);
    setDataIsReady(1);
  }, [slicedData]);

  return (
    <>
      <Head>
        <title>{username} stats</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {dataIsReady === 0 ? (
        <>
          <Navbar />
          <h1>Username does not exist, try again</h1>
        </>
      ) : (
        <>
          <Navbar />
          {finalData.length === 0 ? (
            <div className="loader">
              <h3>Loading Games</h3>
              <FontAwesomeIcon icon={faChess} size="10x" />
            </div>
          ) : (
            <Main chessData={finalData} />
          )}
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
  return { props: { data, username } };
}

export default UserStats;
