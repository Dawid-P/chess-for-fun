import { useForm } from "react-hook-form";
import chessData from "../functions/chessData";

const Navbar = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ username, dateFrom, dateTo }) => {
    let response = await fetch(
      `https://api.chess.com/pub/player/${username}/games/archives`
    );
    if (response.ok) {
      let json = await response.json();
      let data = chessData(json, dateFrom, dateTo, username);
      console.log(data);
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
    </nav>
  );
};

export default Navbar;
