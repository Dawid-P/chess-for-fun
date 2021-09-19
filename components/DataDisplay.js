import React from "react";
import Card from "./Card";
import styles from "../styles/Card.module.css";
import { useState, useEffect } from "react";

const DataDisplay = ({ data }) => {
  let ratingDifference = null;
  let eco = [];
  let gamesPerEco = {};
  let ecoArray = [];

  if (data) {
    console.log(data.formData);
    let minGames = data.formData.minGames;
    let sortBy = data.formData.sortBy;

    data.data.forEach((element) => {
      ratingDifference = ratingDifference + element.userRatingChange;
    });

    // Create sets of all used ECOs
    eco = new Set(data.data.map((item) => item.ECO));
    eco = [...eco];

    // Create object with games per ECO
    eco.forEach((item) => {
      gamesPerEco[item] = data.data.filter((element) => element.ECO === item);
    });

    eco.forEach((item) => {
      if (gamesPerEco[item].length < minGames) {
        delete gamesPerEco[item];
      }
    });

    for (let item in gamesPerEco) {
      ecoArray.push({
        name: item,
        games: gamesPerEco[item],
      });
    }

    ecoArray.sort((a, b) => b.games.length - a.games.length);
  }

  return (
    <>
      {!data ? (
        <h1>No games selected</h1>
      ) : (
        <div>
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
