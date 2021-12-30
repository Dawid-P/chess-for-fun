import React, { useState } from "react";
import styles from "../styles/Stats.module.css";
import { MyResponsivePie } from "./charts/Pie";

const Stats = ({ data }) => {
  console.log(data.blackandwhite);
  const [bestDisplay, setBestDisplay] = useState("wins");
  const overallStats = overallStatsCalc(data.blackandwhite);
  let pieOverall = [
    {
      id: "wins",
      label: "wins",
      value: overallStats.wins,
      color: "hsl(113, 70%, 50%)",
    },
    {
      id: "draws",
      label: "draws",
      value: overallStats.draws,
      color: "hsl(330, 70%, 50%)",
    },
    {
      id: "loses",
      label: "loses",
      value: overallStats.loses,
      color: "hsl(291, 70%, 50%)",
    },
  ];
  let pieWinBy = [
    {
      id: "checkmate",
      label: "checkmate",
      value: overallStats.winBy.mate,
      color: "hsl(113, 70%, 50%)",
    },
    {
      id: "resign",
      label: "resign",
      value: overallStats.winBy.resign,
      color: "hsl(330, 70%, 50%)",
    },
    {
      id: "time",
      label: "time",
      value: overallStats.winBy.time,
      color: "hsl(291, 70%, 50%)",
    },
  ];
  let pieLoseBy = [
    {
      id: "checkmate",
      label: "checkmate",
      value: overallStats.loseBy.mate,
      color: "hsl(113, 70%, 50%)",
    },
    {
      id: "resign",
      label: "resign",
      value: overallStats.loseBy.resign,
      color: "hsl(330, 70%, 50%)",
    },
    {
      id: "time",
      label: "time",
      value: overallStats.loseBy.time,
      color: "hsl(291, 70%, 50%)",
    },
  ];
  let pieDrawBy = [
    {
      id: "repetition",
      label: "repetition",
      value: overallStats.drawBy.repetition,
      color: "hsl(113, 70%, 50%)",
    },
    {
      id: "stalemate",
      label: "stalemate",
      value: overallStats.drawBy.stalemate,
      color: "hsl(330, 70%, 50%)",
    },
    {
      id: "insufficient",
      label: "insufficient",
      value: overallStats.drawBy.insufficient,
      color: "hsl(291, 70%, 50%)",
    },
    {
      id: "agreed",
      label: "agreed",
      value: overallStats.drawBy.agreed,
      color: "hsl(291, 70%, 50%)",
    },
  ];

  // Set data in latest matches, best wins and worst loses
  let lastGames = [...data.blackandwhite];
  let bestWins = [...data.blackandwhite].filter(
    (item) => item.result === "win"
  );
  let worstLoses = [...data.blackandwhite].filter(
    (item) => item.result !== "win"
  );
  let winsRatings = averageRatings(bestWins).toFixed();
  let losesRatings = averageRatings(worstLoses).toFixed();
  lastGames.sort((a, b) => b.end_time - a.end_time).splice(5);
  bestWins.sort((a, b) => b.opponent.rating - a.opponent.rating).splice(15);
  worstLoses.sort((a, b) => a.opponent.rating - b.opponent.rating).splice(15);

  return (
    <div className={styles.stats}>
      <div className={styles.card}>
        <div className={styles.charts}>
          <div className={styles.pie}>
            <h4>Overall</h4>
            <MyResponsivePie data={pieOverall} />
          </div>
          {/* <h4>
          Wins: {overallStats.wins} Draws: {overallStats.draws} Loses:{" "}
          {overallStats.loses}
        </h4> */}
          {/* <p>
          Average win: {winsRatings} Average lose: {losesRatings}
        </p> */}

          <div className={styles.pie}>
            <h4>Wins</h4>
            <MyResponsivePie data={pieWinBy} />
          </div>
          <div className={styles.pie}>
            <h4>Draws</h4>
            <MyResponsivePie data={pieDrawBy} />
          </div>
          <div className={styles.pie}>
            <h4>Loses</h4>
            <MyResponsivePie data={pieLoseBy} />
          </div>
        </div>
      </div>
      <div className={styles.card}>
        <button className="button" onClick={(e) => setBestDisplay("wins")}>
          Best wins
        </button>
        <button className="button" onClick={(e) => setBestDisplay("loses")}>
          Worst loses
        </button>
        <button className="button" onClick={(e) => setBestDisplay("latest")}>
          Latest matches
        </button>
        {bestDisplay === "wins" && (
          <ul>
            {bestWins.map((item) => (
              <li key={item.end_time}>
                <a href={item.url} rel="noopener noreferrer" target="_blank">
                  {item.matchDate} - {item.opponent.username} (
                  {item.opponent.rating}){" "}
                </a>
              </li>
            ))}
          </ul>
        )}
        {bestDisplay === "loses" && (
          <ul>
            {worstLoses.map((item) => (
              <li key={item.end_time}>
                <a href={item.url} rel="noopener noreferrer" target="_blank">
                  {item.matchDate} - {item.opponent.username} (
                  {item.opponent.rating}){" "}
                </a>
              </li>
            ))}
          </ul>
        )}
        {bestDisplay === "latest" && (
          <ul>
            {lastGames.map((item) => (
              <li key={item.end_time}>
                {item.result} ({item.userRating}) vs {item.opponent.username} (
                {item.opponent.rating})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const averageRatings = (games) => {
  const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;
  let ratings = [];
  games.forEach((item) => {
    ratings.push(item.opponent.rating);
  });

  return average(ratings);
};

const overallStatsCalc = (matches) => {
  const overallStats = {};
  let wins = 0;
  let draws = 0;
  let loses = 0;
  let winBy = {};
  let drawBy = {};
  let loseBy = {};
  winBy.resign = 0;
  winBy.time = 0;
  winBy.mate = 0;
  drawBy.repetition = 0;
  drawBy.stalemate = 0;
  drawBy.agreed = 0;
  drawBy.insufficient = 0;
  loseBy.resign = 0;
  loseBy.mate = 0;
  loseBy.time = 0;

  matches.forEach((item) => {
    if (item.result === "win") {
      wins++;
      if (
        item.opponent.result === "resigned" ||
        item.opponent.result === "abandoned"
      )
        winBy.resign++;
      if (item.opponent.result === "checkmated") winBy.mate++;
      if (item.opponent.result === "timeout") winBy.time++;
    }
    if (
      item.result === "stalemate" ||
      item.result === "insufficient" ||
      item.result === "50move" ||
      item.result === "repetition" ||
      item.result === "agreed" ||
      item.result === "timevsinsufficient"
    ) {
      draws++;
      if (item.result === "stalemate") drawBy.stalemate++;
      if (item.result === "agreed") drawBy.agreed++;
      if (
        item.result === "insufficient" ||
        item.result === "timevsinsufficient"
      )
        drawBy.insufficient++;
      if (item.result === "repetition" || item.result === "50move")
        drawBy.repetition++;
    }
    if (
      item.result === "checkmated" ||
      item.result === "timeout" ||
      item.result === "resigned" ||
      item.result === "lose" ||
      item.result === "abandoned"
    ) {
      loses++;
      if (item.result === "resigned" || item.result === "abandoned")
        loseBy.resign++;
      if (item.result === "checkmated") loseBy.mate++;
      if (item.result === "timeout") loseBy.time++;
    }
  });
  overallStats.wins = wins;
  overallStats.draws = draws;
  overallStats.loses = loses;
  overallStats.winBy = winBy;
  overallStats.loseBy = loseBy;
  overallStats.drawBy = drawBy;

  return overallStats;
};

export default Stats;
