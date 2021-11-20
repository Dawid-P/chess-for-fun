const pgnParser = require("pgn-parser");
const chessData = async (json, dateFrom, dateTo, username) => {
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

  if (dateFromIndex === -1) {
    let ard = dateFrom.split("/");
    let year = parseInt(ard[0]);
    let month = parseInt(ard[1]);
    while (dateFromIndex === -1) {
      month = parseInt(month);
      if (month < 12) {
        month = month + 1;
      } else {
        month = 1;
        year = year + 1;
      }
      if (month < 10) {
        month = "0" + month.toString();
      }
      console.log("month: ", month);

      dateFromIndex = data.indexOf(
        `https://api.chess.com/pub/player/${username}/games/${year}/${month}`
      );
    }
  }

  if (dateToIndex === -1) {
    let ard = dateFrom.split("/");
    let year = parseInt(ard[0]);
    let month = parseInt(ard[1]);
    while (dateToIndex === -1) {
      month = parseInt(month);
      if (month < 12) {
        month = month + 1;
      } else {
        month = 1;
        year = year + 1;
      }
      if (month < 10) {
        month = "0" + month.toString();
      }

      dateToIndex = data.indexOf(
        `https://api.chess.com/pub/player/${username}/games/${year}/${month}`
      );
    }
  }

  let slicedData = data.slice(dateFromIndex, dateToIndex + 1);

  return slicedData;
};

export default chessData;
