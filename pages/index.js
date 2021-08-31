import data from "../data";
import styles from "../styles/Home.module.css";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";

// const pgnParser = require("pgn-parser");

// let chessData = data();
// let chessDataAllGames = [];
// let chessDataBlack = [];
// let pircDefense = [];
// let pircWon = 0;
// let pircLost = 0;
// let ratingChange = 0;
// let allOpenings = [];

// chessData.games.forEach((item) => {
//   if (item.time_control === "180") {
//     let [pgnView] = pgnParser.parse(item.pgn);
//     item.ECO = pgnView.headers[9].value;
//     item.opening = pgnView.headers[10].value;
//     chessDataAllGames.push(item);
//   }
// });

// allOpenings = [...new Set(chessDataAllGames.map((item) => item.ECO))];
// console.log(allOpenings);

// chessDataAllGames.forEach((item) => {
//   if (item.black.username === "evad90") {
//     chessDataBlack.push(item);
//   }
// });

// chessDataAllGames.sort((a, b) => a.end_time - b.end_time);

// let id = 1;

// chessDataAllGames.forEach((item) => {
//   item.id = id;
//   id++;
// });

// chessDataBlack.forEach((item) => {
//   if (item.ECO === "B07") {
//     pircDefense.push(item);
//   }
// });

// pircDefense.forEach((item) => {
//   item.black.result === "win" && pircWon++;
//   item.white.result === "win" && pircLost++;
// });

// let calcBefore = (matchId) => {
//   matchId = matchId - 2;
//   let result = 0;
//   if (chessDataAllGames[matchId] === undefined) return (result = 0);
//   if (chessDataAllGames[matchId].black.username === "evad90")
//     result = chessDataAllGames[matchId].black.rating;
//   if (chessDataAllGames[matchId].white.username === "evad90")
//     result = chessDataAllGames[matchId].white.rating;
//   return result;
// };

// console.log(chessDataAllGames);

// pircDefense.forEach((item) => {
//   let ratingAfter = item.black.rating;
//   let ratingBefore = calcBefore(item.id);

//   if (ratingBefore === 0) {
//     ratingBefore = ratingAfter;
//   }

//   let difference = ratingAfter - ratingBefore;

//   console.log("itemID: ", item.id, ratingBefore, ratingAfter, difference);

//   ratingChange = ratingChange + difference;
// });

// let pircDraw = pircDefense.length - pircWon - pircLost;

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <aside className={styles.aside}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Openings by</h3>
            <input {...register("openings", {})} type="radio" value="code" />
            <label>Code</label>
            <input {...register("openings", {})} type="radio" value="name" />
            <label>Name</label>

            <h3>Color</h3>
            <input {...register("color", {})} type="radio" value="white" />
            <label>White</label>
            <input {...register("color", {})} type="radio" value="black" />
            <label>Black</label>

            <h3>Time control</h3>
            <input
              type="checkbox"
              placeholder="Bullet"
              {...register("bullet", {})}
            />
            <label>Bullet</label>

            <input
              type="checkbox"
              placeholder="Blitz"
              {...register("blitz", {})}
            />
            <label>Blitz</label>

            <input
              type="checkbox"
              placeholder="Rapid"
              {...register("rapid", {})}
            />
            <label>Rapid</label>

            <input
              type="checkbox"
              placeholder="Classic"
              {...register("classic", {})}
            />
            <label>Classic</label>

            <input type="submit" />
          </form>
        </aside>
        <main className={styles.main}>
          <h1>Chess master</h1>
        </main>
      </div>
    </>
  );
}
