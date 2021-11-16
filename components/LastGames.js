import React from "react";

const LastGames = ({ data }) => {
  console.log(data);
  let lastGames = [...data];

  lastGames.sort((a, b) => b.end_time - a.end_time).splice(5);

  return (
    <div>
      <ul>
        {lastGames.map((item) => (
          <li>
            {item.result} ({item.userRating}) vs {item.opponent.username} (
            {item.opponent.rating}) | Rating: {item.userRatingChange}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LastGames;
