import React from "react";

export const ratingBreakdown = (blackAndWhite) => {
  // change all outcome types to just three: win, draw, lose
  blackAndWhite.forEach((item) => {
    if (
      item.userResult === "stalemate" ||
      item.userResult === "insufficient" ||
      item.userResult === "50move" ||
      item.userResult === "repetition" ||
      item.userResult === "agreed" ||
      item.userResult === "timevsinsufficient"
    ) {
      item.userResult = "draw";
    }
    if (
      item.userResult === "checkmated" ||
      item.userResult === "timeout" ||
      item.userResult === "resigned" ||
      item.userResult === "lose" ||
      item.userResult === "abandoned"
    ) {
      item.userResult = "lose";
    }
  });

  let levels = [
    { name: "-1000", low: 0, high: 999, win: 0, draw: 0, lose: 0 },
    { name: "1000", low: 1000, high: 1099, win: 0, draw: 0, lose: 0 },
    { name: "1100", low: 1100, high: 1199, win: 0, draw: 0, lose: 0 },
    { name: "1200", low: 1200, high: 1299, win: 0, draw: 0, lose: 0 },
    { name: "1300", low: 1300, high: 1399, win: 0, draw: 0, lose: 0 },
    { name: "1400", low: 1400, high: 1499, win: 0, draw: 0, lose: 0 },
    { name: "1500", low: 1500, high: 1599, win: 0, draw: 0, lose: 0 },
    { name: "1600", low: 1600, high: 1699, win: 0, draw: 0, lose: 0 },
    { name: "1700", low: 1700, high: 1799, win: 0, draw: 0, lose: 0 },
    { name: "1800", low: 1800, high: 1899, win: 0, draw: 0, lose: 0 },
    { name: "1900", low: 1900, high: 1999, win: 0, draw: 0, lose: 0 },
    { name: "2000", low: 2000, high: 2099, win: 0, draw: 0, lose: 0 },
    { name: "+2100", low: 2100, high: 5000, win: 0, draw: 0, lose: 0 },
  ];

  for (let item of blackAndWhite) {
    levels.forEach((level) => {
      if (
        (item.opponent.rating > level.low) &
        (item.opponent.rating < level.high)
      ) {
        if (item.userResult === "win") {
          level.win++;
        }
        if (item.userResult === "draw") {
          level.draw++;
        }
        if (item.userResult === "lose") {
          level.lose++;
        }
      }
    });
  }

  return levels;
};
