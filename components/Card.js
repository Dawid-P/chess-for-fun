import React from "react";
import styles from "../styles/Card.module.css";

const Card = ({ data, name }) => {
  let games = data[name];
  let ratingGain = 0;
  let ratingPerGame = 0;

  games.forEach((element) => {
    ratingGain = ratingGain + element.userRatingChange;
  });

  ratingPerGame = (ratingGain / games.length).toFixed(2);

  return (
    <div className={styles.card}>
      <p>Name: {name}</p>
      <p>Number of games: {games.length}</p>
      <p className={ratingGain > 0 ? styles.positive : styles.negative}>
        Rating gain: {ratingGain}
      </p>
      <p>Rating per game: {ratingPerGame}</p>
    </div>
  );
};

export default Card;
