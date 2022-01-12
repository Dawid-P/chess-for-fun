import React from "react";
import styles from "../styles/Rating.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faCalendarDay,
  faCrosshairs,
  faFastForward,
} from "@fortawesome/free-solid-svg-icons";

const Rating = ({ type, data }) => {
  let icon = faBolt;
  if (type === "bullet") {
    icon = faCrosshairs;
    data = data.chess_bullet;
  }
  if (type === "blitz") {
    icon = faBolt;
    data = data.chess_blitz;
  }
  if (type === "rapid") {
    icon = faFastForward;
    data = data.chess_rapid;
  }
  if (type === "daily") {
    icon = faCalendarDay;
    data = data.chess_daily;
  }

  if (data === undefined) {
    data = {
      last: {},
      best: {},
    };
    data.last.rating = 0;
    data.best.rating = 0;
  }

  console.log(data);
  return (
    <div className={styles.rating}>
      <FontAwesomeIcon icon={icon} size="2x" />
      <section>
        <div>{type.toUpperCase()}</div>
        <div>Rating: {data.last.rating}</div>
        <div>Best: {data.best.rating}</div>
      </section>
    </div>
  );
};

export default Rating;
