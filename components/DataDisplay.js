import React from "react";
import Card from "./Card";
import styles from "../styles/Card.module.css";
import { useState, useEffect } from "react";
import Stats from "./Stats";

const DataDisplay = ({ data }) => {
  let ratingDifference = null;
  let eco = [];
  let opening = [];
  let gamesPerEco = {};
  let ecoArray = [];

  if (data) {
    let minGames = data.formData.minGames;
    let sortBy = data.formData.sortBy;

    data.data.forEach((element) => {
      ratingDifference = ratingDifference + element.userRatingChange;
    });

    // Create sets of all used ECOs
    eco = new Set(data.data.map((item) => item.ECO));
    eco = [...eco];
    // Create sets of all used openings
    opening = new Set(data.data.map((item) => item.opening));
    opening = [...opening];

    // Create object with games per ECO
    opening.forEach((item) => {
      gamesPerEco[item] = data.data.filter(
        (element) => element.opening === item
      );
    });

    opening.forEach((item) => {
      if (gamesPerEco[item].length < minGames) {
        delete gamesPerEco[item];
      }
    });

    for (let item in gamesPerEco) {
      let ratingGain = 0;
      gamesPerEco[item].forEach((element) => {
        ratingGain = ratingGain + element.userRatingChange;
      });
      ecoArray.push({
        name: item,
        games: gamesPerEco[item],
        gamesNr: gamesPerEco[item].length,
        ratingGain: ratingGain,
        ratingPerGame: (ratingGain / gamesPerEco[item].length).toFixed(2),
      });
    }

    if (sortBy === "gamesNr") {
      ecoArray.sort((a, b) => b.gamesNr - a.gamesNr);
    }
    if (sortBy === "ratingGain") {
      ecoArray.sort((a, b) => b.ratingGain - a.ratingGain);
    }
    if (sortBy === "ratingPerGame") {
      ecoArray.sort((a, b) => b.ratingPerGame - a.ratingPerGame);
    }
  }

  return (
    <>
      {!data ? (
        <div className={styles.noGames}>
          <h1>No games selected</h1>
        </div>
      ) : (
        <div>
          <div>
            <Stats data={data} />
          </div>
          <div className={styles.cards}>
            {ecoArray.map((item) => (
              <Card key={item.name} data={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default DataDisplay;
