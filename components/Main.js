import React from "react";
import styles from "../styles/Home.module.css";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import DataDisplay from "./DataDisplay";

const Main = ({ chessData = [] }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let [numberOfDownloadedGames, setNNumberOfDownloadedGames] = useState(0);
  useEffect(() => {
    setNNumberOfDownloadedGames(chessData.length);
  }, [chessData.length]);

  let [filteredChessData, setFilteredChessData] = useState(null);

  const filterChessData = (chessData, formData) => {
    let finalData = [];
    let finalDataObject = {};
    for (let item of chessData) {
      if (formData.color === "white" && item.userColor === "white") {
        item.time_class === "bullet" &&
          formData.bullet === true &&
          finalData.push(item);
        item.time_class === "blitz" &&
          formData.blitz === true &&
          finalData.push(item);
        item.time_class === "rapid" &&
          formData.rapid === true &&
          finalData.push(item);
        item.time_class === "daily" &&
          formData.daily === true &&
          finalData.push(item);
      }
      if (formData.color === "black" && item.userColor === "black") {
        item.time_class === "bullet" &&
          formData.bullet === true &&
          finalData.push(item);
        item.time_class === "blitz" &&
          formData.blitz === true &&
          finalData.push(item);
        item.time_class === "rapid" &&
          formData.rapid === true &&
          finalData.push(item);
        item.time_class === "daily" &&
          formData.daily === true &&
          finalData.push(item);
      }
    }
    finalData.unshift(formData.minGames);

    finalDataObject.data = finalData;
    finalDataObject.formData = formData;

    setFilteredChessData(finalDataObject);
  };

  const onSubmit = (formData) => {
    filterChessData(chessData, formData);
  };
  return (
    <div className={styles.container}>
      <aside className={styles.aside}>
        <h1>{numberOfDownloadedGames} games downloaded.</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3>Minimum number of games</h3>
          <input
            type="number"
            placeholder="Enter number"
            {...register("minGames", { required: true, min: 1 })}
          />

          <h3>Color</h3>
          <input {...register("color", {})} type="radio" value="white" />
          <label>White</label>
          <input {...register("color", {})} type="radio" value="black" />
          <label>Black</label>

          <h3>Time class</h3>
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
            placeholder="Daily"
            {...register("daily", {})}
          />
          <label>Daily</label>

          <h3>Sort by</h3>
          <input {...register("sortBy", {})} type="radio" value="gamesNr" />
          <label>Number of games</label>
          <input {...register("sortBy", {})} type="radio" value="ratingGain" />
          <label>Rating gain</label>
          <input
            {...register("sortBy", {})}
            type="radio"
            value="ratingPerGame"
          />
          <label>Rating per game</label>

          <input type="submit" />
        </form>
      </aside>
      <main className={styles.main}>
        <DataDisplay data={filteredChessData} />
      </main>
    </div>
  );
};

export default Main;
