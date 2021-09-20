import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Router from "next/router";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [userInForm, setUserInForm] = useState(null);
  const [toInForm, setToInForm] = useState(null);
  const [fromInForm, setFromInForm] = useState(null);

  useEffect(() => {
    setUserInForm(router.query.id);
    setToInForm(router.query.to);
    setFromInForm(router.query.from);
  }, [router.query.id]);

  Router.events.on("routeChangeStart", (url) => {
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false);
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ username, dateFrom, dateTo }) => {
    let goToStatsPage = `/${username}?from=${dateFrom}&to=${dateTo}`;
    router.push(goToStatsPage);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <nav className={styles.navbar}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Username</label>
            <input
              defaultValue={userInForm ? userInForm : undefined}
              {...register("username", { required: true })}
            />

            <label>From</label>
            <input
              defaultValue={userInForm ? fromInForm : undefined}
              type="month"
              {...register("dateFrom", { required: true })}
            />
            <label>To</label>
            <input
              defaultValue={userInForm ? toInForm : undefined}
              type="month"
              {...register("dateTo", { required: true })}
            />
            <input
              className={styles.submit}
              value="Download games"
              type="submit"
            />
          </form>
        </nav>
      )}
    </>
  );
};

export default Navbar;
