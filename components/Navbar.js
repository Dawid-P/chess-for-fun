import { useForm } from "react-hook-form";
import chessData from "../functions/chessData";
import { useState } from "react";
const pgnParser = require("pgn-parser");

const Navbar = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  let allGamesWithECO = [];

  const [count, setCount] = useState(allGamesWithECO.length);
  const [data, setData] = useState([]);

  const onSubmit = async ({ username, dateFrom, dateTo }) => {
    let response = await fetch(
      `https://api.chess.com/pub/player/${username}/games/archives`
    );
    if (response.ok) {
      let json = await response.json();

      let data1 = chessData(json, dateFrom, dateTo, username);
      setData(data1);
      console.log(data1);
    } else {
      alert("Username does not exist, try again");
    }
  };
  return (
    <nav>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Username</label>
        <input {...register("username", { required: true })} />
        <input type="submit" />

        <h3>Date</h3>
        <label>From</label>
        <input type="month" {...register("dateFrom", { required: true })} />
        <label>To</label>
        <input type="month" {...register("dateTo", { required: true })} />
      </form>
      <h1>AllgameswithECO count: {data.length}</h1>
    </nav>
  );
};

export default Navbar;
