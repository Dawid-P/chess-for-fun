import React from "react";

const DataDisplay = ({ data }) => {
  let ratingDifference = null;
  let openings = [];
  let eco = [];
  if (data) {
    data.forEach((element) => {
      ratingDifference = ratingDifference + element.userRatingChange;
    });
    openings = new Set(data.map((item) => item.opening));
    openings = [...openings];
    eco = new Set(data.map((item) => item.ECO));
    eco = [...eco];
  }
  return (
    <>
      {!data ? (
        <h1>No games selected</h1>
      ) : (
        <div>
          <h1>Chess master</h1>
          <h2>Number of selected games: {data.length}</h2>
          <h2>Rating gain: {ratingDifference}</h2>

          <ol>
            {openings.map((item) => (
              <li key={openings.indexOf(item)}>{item}</li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
};

export default DataDisplay;
