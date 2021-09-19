import React from "react";
import Card from "./Card";
import styles from "../styles/Card.module.css";
import { useState } from "react";

const DataDisplay = ({ data }) => {
  let ratingDifference = null;
  let eco = [];
  let gamesPerEco = {};
  let ecoArray = [];

  // let [sortState, setSortState] = useState([]);

  // const sortArray = (type) => {
  //   const types = {
  //     ratingGain: "ratingGain",
  //     ratingPerGame: "ratingPerGame",
  //     numberOfGames: "numberOfGames",
  //   };
  //   const sortProperty = types[type];
  //   const sorted = ecoArray.sort((a, b) => b[sortProperty] - a[sortProperty]);
  //   console.log(sorted);
  //   setSortState(sorted);
  // };

  if (data) {
    let minGames = data[0];

    data.forEach((element) => {
      ratingDifference = ratingDifference + element.userRatingChange;
    });

    // Create sets of all used ECOs
    eco = new Set(data.map((item) => item.ECO));
    eco = [...eco];

    // Create object with games per ECO
    eco.forEach((item) => {
      gamesPerEco[item] = data.filter((element) => element.ECO === item);
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
          {/* <select select onChange={(e) => sortArray(e.target.value)}>
            <option value="ratingGain">Rating gain</option>
            <option value="ratingPerGame">Rating per game</option>
            <option value="numberOfGames">Number of games</option>
          </select> */}
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
