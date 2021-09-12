import React from "react";
import styles from "../styles/Home.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import DataDisplay from "./DataDisplay";

const Main = ({ chessData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let [filteredChessData, setFilteredChessData] = useState(null);

  const filterChessData = (chessData, formData) => {
    let finalData = [];
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

    setFilteredChessData(finalData);
  };

  const onSubmit = (formData) => {
    filterChessData(chessData, formData);
  };
  return (
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
