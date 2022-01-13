import React, { useEffect, useState } from "react";
import styles from "../styles/UserInfo.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Rating from "../components/Rating";
const UserInfo = () => {
  const router = useRouter();

  let userD = {};
  let userS = {};

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
            <h2>{userData.username}</h2>

            <>
              <Rating type={"bullet"} data={userStats} />

              <Rating type={"blitz"} data={userStats} />

              <Rating type={"rapid"} data={userStats} />

              <Rating type={"daily"} data={userStats} />
            </>

            {/* <h3>Bullet: {userStats?.chess_bullet?.last.rating}</h3>
            <h3>Blitz: {userStats?.chess_blitz?.last.rating}</h3>
            <h3>Rapid: {userStats?.chess_rapid?.last.rating}</h3> */}
          </div>
          <div className={styles.button}>
            <Link href="/">
              <a>
                <button>Back</button>
              </a>
            </Link>
          </div>
        </nav>
      </>
    );
  } else return <h1>Loading user stats</h1>;
};

export default UserInfo;
