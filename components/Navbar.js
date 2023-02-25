import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import styles from "../styles/Navbar.module.css";
import { useLocalStorage } from "./useLocalStorage";

const Navbar = () => {
  const router = useRouter();
  const onlyLettersAndDigits = /^[a-zA-Z0-9]+$/;
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
    username.toLowerCase();
    setDefaultUsername(username);
    let goToStatsPage = `/${username.toLowerCase()}?from=${dateFrom}&to=${dateTo}`;
    router.push(goToStatsPage);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Chess.com username</label>
          <div className={styles.divWithError}>
          <input
            defaultValue={defaultUsername}
            {...register("username", { required: true,
            pattern: onlyLettersAndDigits })}
          />
         {errors.username && errors.username.type === "required" && (
        <span className={styles.errorMessage}>This field is required</span>
      )}
           {errors.username && errors.username.type === "pattern" && (
        <span className={styles.errorMessage}>Only letters and digits are allowed</span>
      )}</div>

          <label>Games from</label>
          <input
            defaultValue={defaultToDate()}
            type="month"
            {...register("dateFrom", { required: true })}
          />
          <label>to</label>
          <input
            defaultValue={defaultToDate()}
            type="month"
            {...register("dateTo", { required: true })}
          />
          <button className={styles.submit} type="submit">
            Show games
          </button>
        </form>
      </nav>
    </>
  );
};

export default Navbar;
