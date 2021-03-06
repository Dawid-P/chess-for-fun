import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import styles from "../styles/Navbar.module.css";
import { useLocalStorage } from "./useLocalStorage";

const Navbar = () => {
  const router = useRouter();

  const defaultToDate = () => {
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    return year + "-" + month;
  };

  const [defaultUsername, setDefaultUsername] = useLocalStorage("username", "");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ username, dateFrom, dateTo }) => {
    setDefaultUsername(username);
    let goToStatsPage = `/${username}?from=${dateFrom}&to=${dateTo}`;
    router.push(goToStatsPage);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Username</label>
          <input
            defaultValue={defaultUsername}
            {...register("username", { required: true })}
          />
          {errors.username?.type === "required" && "Username is required"}

          <label>From</label>
          <input
            defaultValue={defaultToDate()}
            type="month"
            {...register("dateFrom", { required: true })}
          />
          <label>To</label>
          <input
            defaultValue={defaultToDate()}
            type="month"
            {...register("dateTo", { required: true })}
          />
          <button className={styles.submit} type="submit">
            Download games
          </button>
        </form>
      </nav>
    </>
  );
};

export default Navbar;
