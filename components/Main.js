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

  let [filteredChessData, setFilteredChessData] = useState(null);

  const filterChessData = (chessData, formData) => {
    let finalData = [];
    let blackAndWhite = [];
    let finalDataObject = {};
    for (let item of chessData) {
      if (1 === 1) {
        item.time_class === "bullet" &&
          formData.bullet === true &&
          blackAndWhite.push(item);
        item.time_class === "blitz" &&
          formData.blitz === true &&
          blackAndWhite.push(item);
        item.time_class === "rapid" &&
          formData.rapid === true &&
          blackAndWhite.push(item);
        item.time_class === "daily" &&
          formData.daily === true &&
          blackAndWhite.push(item);
      }
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
    finalDataObject.blackandwhite = blackAndWhite;

    setFilteredChessData(finalDataObject);
  };

  useEffect(() => {
    setNNumberOfDownloadedGames(chessData.length);
  }, [chessData.length]);

  const onSubmit = (formData) => {
    filterChessData(chessData, formData);
  };
  return (
    <div className={styles.container}>
      <aside className={styles.aside}>
        <h2>{0 || numberOfDownloadedGames} games downloaded</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p>Minimum number of games</p>
          <input
            className={styles.minGames}
            type="number"
            placeholder="Enter number"
            {...register("minGames", { required: true, min: 1 })}
            defaultValue={1}
          />

          <p>Color</p>
          <label>
            <input
              {...register("color", {})}
              type="radio"
              value="white"
              defaultChecked
            />
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
              defaultChecked
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
              <input
                {...register("sortBy", {})}
                type="radio"
                value="gamesNr"
                defaultChecked
              />
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

          <button className={styles.submit} type="submit">
            Filter games
          </button>
        </form>
      </aside>
      <main className={styles.main}>
        <DataDisplay data={filteredChessData} />
      </main>
    </div>
  );
};

export default Main;
