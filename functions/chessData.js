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
      delete item.fen;
      item.user = username.toLowerCase();

      if (item.white.username.toLowerCase() === username) {
        item.userColor = "white";
        item.userResult = item.white.result;
        item.userRating = item.white.rating;
      }
      if (item.black.username.toLowerCase() === username) {
        item.userColor = "black";
        item.userResult = item.black.result;
        item.userRating = item.black.rating;
      }
      delete item.black;
      delete item.white;
      item.accuracies && delete item.accuracies;
      id++;
    }
  }

  // Add rating change data
  async function addRatingChange(allGames) {
    // Arrays with each time class
    let timeClassArrays = { bullet: [], blitz: [], rapid: [], daily: [] };
    for (let item of allGames) {
      item.time_class === "bullet" && timeClassArrays.bullet.push(item);
      item.time_class === "blitz" && timeClassArrays.blitz.push(item);
      item.time_class === "rapid" && timeClassArrays.rapid.push(item);
      item.time_class === "daily" && timeClassArrays.daily.push(item);
    }

    // Loop thorugh each array and add a rating change property
    for (let arr in timeClassArrays) {
      for (let item of timeClassArrays[arr]) {
        let indexOfMatchBefore = timeClassArrays[arr].indexOf(item) - 1;
        let ratingAfter = item.userRating;
        let ratingBefore = ratingAfter;
        if (indexOfMatchBefore !== -1) {
          ratingBefore = timeClassArrays[arr][indexOfMatchBefore].userRating;
        }

        let difference = ratingAfter - ratingBefore;
        item.userRatingChange = difference;
      }
    }
    allGames = [
      ...timeClassArrays.bullet,
      ...timeClassArrays.blitz,
      ...timeClassArrays.rapid,
      ...timeClassArrays.daily,
    ];
  }

  await sequentialCall(slicedData);
  await structureChessData(allGames);
  await addRatingChange(allGames);

  return allGames;
};

export default chessData;
