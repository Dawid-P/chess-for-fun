import { useForm } from "react-hook-form";

const Navbar = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };
  return (
    <nav>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Username</label>
        <input {...register("Username", { required: true })} />
        <input type="submit" />
      </form>
    </nav>
  );
};

export default Navbar;
