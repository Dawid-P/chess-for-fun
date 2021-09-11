const pgnParser = require("pgn-parser");
const chessData = async (json, dateFrom, dateTo, username) => {
  // Variables
  let allGames = [];
  let games = [];
  let id = 1;
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

  async function sequentialCall(slicedData) {
    for (let item of slicedData) {
      games = await fetcher(item);
      allGames.push(...games.games);
    }
  }
  // Structure data for frontend
  async function structureChessData(allGames) {
    for (let item of allGames) {
      let [pgnView] = pgnParser.parse(item.pgn);
      item.ECO = pgnView.headers[9].value;
      item.opening = pgnView.headers[10].value;
      item.id = id;
      delete item.pgn;
      id++;
    }
  }
  await sequentialCall(slicedData);
  await structureChessData(allGames);

  return allGames;
};

export default chessData;
