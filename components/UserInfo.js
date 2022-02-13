import React, { useEffect, useState } from "react";
import styles from "../styles/UserInfo.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Rating from "../components/Rating";
import Stats from "./Stats";
const UserInfo = ({ data }) => {
  const router = useRouter();

  let userD = {};
  let userS = {};

  let bullet = data.filter((item) => item.time_class === "bullet");
  let blitz = data.filter((item) => item.time_class === "blitz");
  let rapid = data.filter((item) => item.time_class === "rapid");
  let daily = data.filter((item) => item.time_class === "daily");

  const [statsData, setStatsData] = useState(blitz);
  const [statsState, setStatsState] = useState("blitz");

  useEffect(() => {
    getUserData(router.query.id);
  }, [router.query.id]);

  const fetcher = async (url) => fetch(url).then((res) => res.json());

  const [userData, setUserData] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [showStats, setShowStats] = useState(0);

  async function getUserData(username) {
    userD = await fetcher(`https://api.chess.com/pub/player/${username}`);
    userS = await fetcher(`https://api.chess.com/pub/player/${username}/stats`);
    if (userD.code === 0) {
      setShowStats(2);
    } else {
      setUserData(userD);
      setUserStats(userS);
      setShowStats(1);
    }
  }
  if (showStats === 2) {
    return (
      <>
        <h1 className={styles.error}>User does not exist</h1>
        <div className={styles.button}>
          <Link href="/">
            <a>
              <button>Back</button>
            </a>
          </Link>
        </div>
      </>
    );
  }
  if (showStats === 1) {
    return (
      <>
        <nav className={styles.userinfo}>
          <div className={styles.infos}>
            <div>
              <h2>{userData.username}</h2>
              <p>{statsData.length} games played</p>
              <p>
                {router.query.from} to {router.query.to}
              </p>
            </div>

            <button
              onClick={(e) => {
                setStatsData(bullet);
                setStatsState("bullet");
              }}
              className={
                statsState === "bullet" ? styles.selected : styles.unselected
              }
            >
              <Rating type={"bullet"} data={userStats} />
            </button>
            <button
              onClick={(e) => {
                setStatsData(blitz);
                setStatsState("blitz");
              }}
              className={
                statsState === "blitz" ? styles.selected : styles.unselected
              }
            >
              <Rating type={"blitz"} data={userStats} />
            </button>
            <button
              onClick={(e) => {
                setStatsData(rapid);
                setStatsState("rapid");
              }}
              className={
                statsState === "rapid" ? styles.selected : styles.unselected
              }
            >
              <Rating type={"rapid"} data={userStats} />
            </button>
            <button
              onClick={(e) => {
                setStatsData(daily);
                setStatsState("daily");
              }}
              className={
                statsState === "daily" ? styles.selected : styles.unselected
              }
            >
              <Rating type={"daily"} data={userStats} />
            </button>
          </div>
          <div className={styles.button}>
            <Link href="/">
              <a>
                <button>Back</button>
              </a>
            </Link>
          </div>
        </nav>
        <Stats data={statsData} />
      </>
    );
  } else return <></>;
};

export default UserInfo;
