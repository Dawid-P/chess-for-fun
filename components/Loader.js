import React from "react";
import styles from "../styles/Loader.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChess } from "@fortawesome/free-solid-svg-icons";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <h3>Loading Games</h3>
      <FontAwesomeIcon icon={faChess} size="2x" />
    </div>
  );
};

export default Loader;
