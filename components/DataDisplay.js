import React from "react";

const DataDisplay = ({ data }) => {
  let ratingDifference = null;
  if (data) {
    data.forEach((element) => {
      ratingDifference = ratingDifference + element.userRatingChange;
    });
  }
  return (
    <div>
      <h1>Chess master</h1>
      <h2>
        Number of selected games: {!data ? "No games selected" : data.length}{" "}
      </h2>
      <h2>Rating gain: {ratingDifference}</h2>
    </div>
  );
};

export default DataDisplay;
