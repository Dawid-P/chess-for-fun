import React from "react";
import styles from "../styles/Card.module.css";
import ecoData from "../functions/ecoData"

const Card = ({ data }) => {
  let games = data.games;
  let ratingGain = data.ratingGain;
  let ratingPerGame = data.ratingPerGame;
  let name = data.name;

  name = name
    .replace("https://www.chess.com/openings/", "")
    .replaceAll("-", " ");

  let ecoObj = ecoData();
  let userColor = data.games[0].userColor;

  let fen = ecoObj.find((item) => item.eco === data.name);
  if (fen === undefined) {
    fen = "rnbqkbnr/1ppppppp/8/p7/8/5N2/PPPPPPPP/RNBQKB1R w KQkq";
  }

  return (
    <div className={ratingGain > 0 ? styles.positive : styles.negative}>
      <p>{name}</p>
      <p>Games: {games.length}</p>
      <p>Rating gain: {ratingGain}</p>
      <p>
        {ratingPerGame > 0 ? `+${ratingPerGame}` : ratingPerGame} points per
        game
      </p>
    </div>
  );
};

export default Card;
