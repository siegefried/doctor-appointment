import { Button } from "@mantine/core";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom/dist";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../services/doctorService";
import { TimeInput } from "@mantine/dates";

const AddDoctorForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: apiClient.create,
    onSuccess: async () => {
      notifications.show({
        title: "Success",
        message: "Doctor registered successfully.",
      });
      //   await queryClient.invalidateQueries("validateToken"); need to change to re-render for doctors
      navigate("/");
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
    // console.log(data);
  });

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
          <h2 className="text-3xl font-bold">Doctor Profile</h2>
          <h4>Personal Info</h4>
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
          <div className="flex flex-col md:flex-row gap-5">
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
                {...register("contact", {
                  required: "This field is required.",
                })}
              ></input>
              {errors.contact && (
                <span className="text-red-500">{errors.contact.message}</span>
              )}
            </label>
          </div>
          <h4>Profesional Info</h4>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Website
            <input
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("website", { required: "This field is required." })}
            ></input>
            {errors.website && (
              <span className="text-red-500">{errors.website.message}</span>
            )}
          </label>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Address
            <textarea
              className="border rounded w-full font-normal"
              {...register("address", { required: "This field is required." })}
            ></textarea>
            {errors.address && (
              <span className="text-red-500">{errors.address.message}</span>
            )}
          </label>
          <div className="flex flex-col md:flex-row gap-5">
            <label className="text-gray-700 text-sm font-bold flex-1">
              Specialization
              <input
                className="border rounded w-full py-1 px-2 font-normal"
                {...register("specialization", {
                  required: "This field is required.",
                })}
              ></input>
              {errors.specialization && (
                <span className="text-red-500">
                  {errors.specialization.message}
                </span>
              )}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
              Experience
              <input
                className="border rounded w-full py-1 px-2 font-normal"
                {...register("experience", {
                  required: "This field is required.",
                })}
              ></input>
              {errors.experience && (
                <span className="text-red-500">
                  {errors.experience.message}
                </span>
              )}
            </label>
          </div>
          <label className="text-gray-700 text-sm font-bold flex-1">
            Fee per Consultation
            <input
              type="number"
              min={0}
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("costPerConsult", {
                required: "This field is required.",
              })}
            ></input>
            {errors.costPerConsult && (
              <span className="text-red-500">
                {errors.costPerConsult.message}
              </span>
            )}
          </label>
          {/* <h4>Schedule</h4>
          <div className="flex flex-col md:flex-row gap-5">
            <label className="text-gray-700 text-sm font-bold flex-1">
              Start Time
              <TimeInput />
              <input
                className="border rounded w-full py-1 px-2 font-normal"
                {...register("startTime", {
                  required: "This field is required.",
                })}
              ></input>
              {errors.startTime && (
                <span className="text-red-500">{errors.startTime.message}</span>
              )}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
              End Time
              <TimeInput />
              <input
                className="border rounded w-full py-1 px-2 font-normal"
                {...register("endTime", {
                  required: "This field is required.",
                })}
              ></input>
              {errors.endTime && (
                <span className="text-red-500">{errors.endTime.message}</span>
              )}
            </label>
          </div> */}
          <div className="flex items-center justify-between">
            <span></span>
            <Button type="submit">Add Doctor</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddDoctorForm;
