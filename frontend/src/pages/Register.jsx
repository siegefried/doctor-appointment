import { Button } from "@mantine/core";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom/dist";
import { notifications } from "@mantine/notifications";
import * as apiClient from "../services/userService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Register = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: apiClient.register,
    onSuccess: async () => {
      notifications.show({
        title: "Success",
        message: "User registered successfully.",
      });
      await queryClient.invalidateQueries("validateToken");
      navigate("/login");
    },

    onError: (error) => {
      notifications.show({
        title: "Error",
        message: error.message,
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    data.role = "user";
    mutation.mutate(data);
  });

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
          <h2 className="text-3xl font-bold">Create an Account</h2>
          <div className="flex flex-col md:flex-row gap-5">
            <label className="text-gray-700 text-sm font-bold flex-1">
              First Name
              <input
                className="border rounded w-full py-1 px-2 font-normal"
                {...register("firstName", {
                  required: "This field is required.",
                })}
              ></input>
              {errors.firstName && (
                <span className="text-red-500">{errors.firstName.message}</span>
              )}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
              Last Name
              <input
                className="border rounded w-full py-1 px-2 font-normal"
                {...register("lastName", {
                  required: "This field is required.",
                })}
              ></input>
              {errors.lastName && (
                <span className="text-red-500">{errors.lastName.message}</span>
              )}
            </label>
          </div>
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
            Contact
            <input
              type="tel"
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("contact", { required: "This field is required." })}
            ></input>
            {errors.contact && (
              <span className="text-red-500">{errors.contact.message}</span>
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
          <label className="text-gray-700 text-sm font-bold flex-1">
            Confirm Password
            <input
              type="password"
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("confirmPassword", {
                validate: (val) => {
                  if (!val) {
                    return "This field is required.";
                  } else if (watch("password") !== val) {
                    return "Your passwords do not match.";
                  }
                },
              })}
            ></input>
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </label>
          <div className="flex items-center justify-between">
            <span className="text-sm">
              Already have an account?{" "}
              <Link className="underline" to="/login">
                Login here
              </Link>
            </span>
            <Button type="submit">Register</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
