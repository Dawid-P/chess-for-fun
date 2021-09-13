import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Router from "next/router";
import { useState } from "react";
import Loader from "./Loader";

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  Router.events.on("routeChangeStart", (url) => {
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", (url) => {
    setLoading(false);
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = ({ username, dateFrom, dateTo }) => {
    let goToStatsPage = `/${username}?from=${dateFrom}&to=${dateTo}`;

    router.push(goToStatsPage);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
      )}
    </>
  );
};

export default Navbar;
