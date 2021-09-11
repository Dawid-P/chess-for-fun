import React from "react";
import styles from "../styles/Home.module.css";
import { useForm } from "react-hook-form";

const Main = ({ chessData }) => {
  console.log("main: ", chessData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
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
  );
};

export default Main;
