import React from "react";
import styles from "../styles/Card.module.css";
import { Chessboard } from "react-chessboard";
import ecoData from "../functions/ecoData";

const Card = ({ data }) => {
  let games = data.games;
  let name = data.name;
  let ratingGain = 0;
  let ratingPerGame = 0;
  let ecoObj = ecoData();
  let userColor = data.games[0].userColor;

  let fen = ecoObj.find((item) => item.eco === data.name);
  if (fen === undefined) {
    fen = "rnbqkbnr/1ppppppp/8/p7/8/5N2/PPPPPPPP/RNBQKB1R w KQkq";
  }
  console.log(fen);

  games.forEach((element) => {
    ratingGain = ratingGain + element.userRatingChange;
  });

  ratingPerGame = (ratingGain / games.length).toFixed(2);

  return (
    <div className={ratingGain > 0 ? styles.positive : styles.negative}>
      <p>{fen.name}</p>
      <p>Games: {games.length}</p>
      <p>Rating gain: {ratingGain}</p>
      <p>Rating per game: {ratingPerGame}</p>
      <Chessboard
        id="BasicBoard"
        position={fen.fen}
        arePiecesDraggable={false}
        boardWidth={200}
        boardOrientation={userColor}
      />
    </div>
  );
};

export default Card;
