import React from "react";
import styles from "../styles/Card.module.css";

const Card = ({ data }) => {
  let games = data.games;
  let name = data.name;
  let ratingGain = 0;
  let ratingPerGame = 0;

  games.forEach((element) => {
    ratingGain = ratingGain + element.userRatingChange;
  });

  ratingPerGame = (ratingGain / games.length).toFixed(2);

  return (
    <div className={ratingGain > 0 ? styles.positive : styles.negative}>
      <p>Name: {name}</p>
      <p>Games: {games.length}</p>
      <p>Rating gain: {ratingGain}</p>
      <p>Rating per game: {ratingPerGame}</p>
    </div>
  );
};

export default Card;
