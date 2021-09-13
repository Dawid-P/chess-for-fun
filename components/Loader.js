import React from "react";
import styles from "../styles/Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <h1>Loading data....</h1>
      <img src="../spinner.svg" />
    </div>
  );
};

export default Loader;
