const chessData = (json, dateFrom, dateTo, username) => {
  // Variables
  let allGames = [];
  let games = [];
  let allGamesWithECO = [];
  // Take all months archive and slice the array to months selected by user
  dateFrom = dateFrom.replace("-", "/");
  dateTo = dateTo.replace("-", "/");
  let data = [...json.archives];
  let dateFromIndex = data.indexOf(
    `https://api.chess.com/pub/player/${username}/games/${dateFrom}`
  );
  let dateToIndex = data.indexOf(
    `https://api.chess.com/pub/player/${username}/games/${dateTo}`
  );
  let slicedData = data.slice(dateFromIndex, dateToIndex + 1);

  // Extract all games for months selected by user
  const fetcher = async (url) => fetch(url).then((res) => res.json());

  async function sequentialCall(monthsArray) {
    for (let item of monthsArray) {
      games = await fetcher(item);
      allGames.push(...games.games);
    }
  }
  sequentialCall(slicedData);

  return allGames;
};

export default chessData;
