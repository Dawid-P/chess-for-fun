import React from "react";
import styles from "../styles/Stats.module.css";
import { useState, useEffect } from "react";

const Stats = ({ data }) => {
  let lastGames = [...data];
  let bestWins = [...data].filter((item) => item.result === "win");
  let worstLoses = [...data].filter((item) => item.result !== "win");

  const averageRatings = games => {
    const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
    let ratings = []
    games.forEach(item => {
      ratings.push(item.opponent.rating)
    });
    console.log(average(ratings))
    return average(ratings)
  }

  let winsRatings = averageRatings(bestWins).toFixed();
  let losesRatings = averageRatings(worstLoses).toFixed();
  

  lastGames.sort((a, b) => b.end_time - a.end_time).splice(5);

  bestWins.sort((a, b) => b.opponent.rating - a.opponent.rating).splice(15);

  worstLoses.sort((a, b) => a.opponent.rating - b.opponent.rating).splice(15);

  
  return (
    <div className={styles.stats}>
      <div className={styles.card}>
        <h2>Latest matches</h2>
        <ul>
          {lastGames.map((item) => (
            <li key={item.end_time}>
              {item.result} ({item.userRating}) vs {item.opponent.username} (
              {item.opponent.rating}) | Rating: {item.userRatingChange}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.card}>
        <h2>Best wins</h2>
        <h3>Average: {winsRatings}</h3>
        <ul>
          {bestWins.map((item) => (
            <li key={item.end_time}>
              {item.opponent.username} ({item.opponent.rating})
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.card}>
        <h2>Worst loses</h2>
        <h3>Average: {losesRatings}</h3>
        <ul>
          {worstLoses.map((item) => (
            <li key={item.end_time}>
              {item.opponent.username} ({item.opponent.rating})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Stats;
