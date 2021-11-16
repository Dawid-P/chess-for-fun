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
        <h1>{0 || numberOfDownloadedGames} games downloaded</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p>Minimum number of games</p>
          <input
            className={styles.minGames}
            type="number"
            placeholder="Enter number"
            {...register("minGames", { required: true, min: 1 })}
          />

          <p>Color</p>
          <label>
            <input {...register("color", {})} type="radio" value="white" />
            White
          </label>
          <label>
            <input {...register("color", {})} type="radio" value="black" />
            Black
          </label>

          <p>Time class</p>
          <label>
            <input
              type="checkbox"
              placeholder="Bullet"
              {...register("bullet", {})}
            />
            Bullet
          </label>

          <label>
            <input
              type="checkbox"
              placeholder="Blitz"
              {...register("blitz", {})}
            />
            Blitz
          </label>

          <label>
            <input
              type="checkbox"
              placeholder="Rapid"
              {...register("rapid", {})}
            />
            Rapid
          </label>

          <label>
            <input
              type="checkbox"
              placeholder="Daily"
              {...register("daily", {})}
            />
            Daily
          </label>

          <p>Sort by</p>
          <div>
            <label>
              <input {...register("sortBy", {})} type="radio" value="gamesNr" />
              Number of games
            </label>
          </div>
          <div>
            <label>
              <input
                {...register("sortBy", {})}
                type="radio"
                value="ratingGain"
              />
              Rating gain
            </label>
          </div>
          <div>
            <label>
              <input
                {...register("sortBy", {})}
                type="radio"
                value="ratingPerGame"
              />
              Rating per game
            </label>
          </div>

          <input className={styles.submit} value="Filter games" type="submit" />
        </form>
      </aside>
      <main className={styles.main}>
        <DataDisplay data={filteredChessData} />
      </main>
    </div>
  );
};

export default Main;
