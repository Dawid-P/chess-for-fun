export const ratingBreakdown = (data) => {
  // change all outcome types to just three: win, draw, lose
  data.forEach((item) => {
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

  const lowestRating = Math.min(...data.map((item) => item.opponent.rating));
  const highestRating = Math.max(...data.map((item) => item.opponent.rating));
  const lowestLevelBoundary = Math.floor(lowestRating / 100) * 100;
  const highestLevelBoundary = Math.ceil(highestRating / 100) * 100;
  const numLevels = (highestLevelBoundary - lowestLevelBoundary) / 100 + 1;

  let levels = [];

  for (let i = 0; i < numLevels; i++) {
    const lowBoundary = lowestLevelBoundary + i * 100;
    const highBoundary = lowBoundary + 99;
    levels.push({
      name: `${lowBoundary}+`,
      low: lowBoundary,
      high: highBoundary,
      win: 0,
      draw: 0,
      lose: 0,
    });
  }

  for (let item of data) {
    levels.forEach((level) => {
      if (item.opponent.rating >= level.low && item.opponent.rating <= level.high) {
        if (item.userResult === "win") {
          level.win++;
        } else if (item.userResult === "draw") {
          level.draw++;
        } else if (item.userResult === "lose") {
          level.lose++;
        }
      }
    });
  }
  const filteredLevels = levels.filter(item => item.win+item.draw+item.lose !== 0);

  return filteredLevels;
};
