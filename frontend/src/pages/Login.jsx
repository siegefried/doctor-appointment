import { Button } from "@mantine/core";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom/dist";
import { notifications } from "@mantine/notifications";
import * as apiClient from "../services/userService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: apiClient.login,
    onSuccess: async () => {
      notifications.show({
        title: "Success",
        message: "Logged in.",
      });
      await queryClient.invalidateQueries("validateToken");
      navigate("/dashboard");
    },

    onError: (error) => {
      notifications.show({
        title: "Error",
        message: error.message,
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="h-screen flex items-center justify-center">
      <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold">Welcome Back</h2>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            type="email"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("email", { required: "This field is required." })}
          ></input>
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Password
          <input
            type="password"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("password", {
              required: "This field is required.",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters.",
              },
            })}
          ></input>
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </label>
        <div className="flex items-center justify-between gap-5">
          <span className="text-sm">
            Not Registered?{" "}
            <Link className="underline" to="/register">
              Create your account here
            </Link>
          </span>
          <Button type="submit">Login</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
