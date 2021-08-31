import axios from "axios";

const chessData = (json, dateFrom, dateTo, username) => {
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
  let allGames = [];

  async function sequentialCall(monthsArray) {
    console.log(monthsArray.length);
    for (let item of monthsArray) {
      axios.get(item).then(function (response) {
        allGames.push(response.data.games);
      });
    }
  }

  sequentialCall(slicedData);

  return allGames;
};

export default chessData;
