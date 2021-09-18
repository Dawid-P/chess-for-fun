import React from "react";
import Card from "./Card";
import styles from "../styles/Card.module.css";

const DataDisplay = ({ data }) => {
  let ratingDifference = null;
  let openings = [];
  let eco = [];
  let gamesPerEco = {};
  let ecoForCards = [];
  if (data) {
    data.forEach((element) => {
      ratingDifference = ratingDifference + element.userRatingChange;
    });

    // Create sets of all used openings and ECOs
    openings = new Set(data.map((item) => item.opening));
    openings = [...openings];
    eco = new Set(data.map((item) => item.ECO));
    eco = [...eco];

    // Create object with games per ECO
    eco.forEach((item) => {
      gamesPerEco[item] = data.filter((element) => element.ECO === item);
    });

    eco.forEach((item) => {
      if (gamesPerEco[item].length < 5) {
        delete gamesPerEco[item];
      }
    });

    ecoForCards = [...Object.keys(gamesPerEco)];
  }

  return (
    <>
      {!data ? (
        <h1>No games selected</h1>
      ) : (
        <div>
          <div className={styles.cards}>
            {ecoForCards.map((item) => (
              <Card key={item} data={gamesPerEco} name={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default DataDisplay;
