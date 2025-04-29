"use client";
import { z } from "zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createUserSchema } from "@/app/validationSchema";

// interface for registration form
type FormData = z.infer<typeof createUserSchema>;

const RegisterSupervisorForm = () => {
  const [fieldError, setFieldError] = useState(""); // hook for showing errors messages
  const [fieldSuccess, setFieldSuccess] = useState(""); // hook for showing success messages

  // react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(createUserSchema),
  });

  // onSubmit function
  const onSubmit = async (data: FormData) => {
    try {
      await axios.post("/api/user/supervisor", data); // send request
      setFieldSuccess("User Has Been Successfully Registered!"); // show success message
      reset(); // clear input fields
    } catch (error: any) {
      // Check if the error response contains a message
      if (error.response && error.response.data && error.response.data.error) {
        setFieldError(error.response.data.error); // Set the error message from the API
      } else {
        setFieldError("An unexpected error has occurred!"); // Fallback error message
      }
    }
  };

  return (
    <div>
      {/* Error message alert */}
      {fieldError && (
        <div
          role="alert"
          className="alert alert-error my-5 flex place-content-center max-w-120 md:max-w-200 mx-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{fieldError}</span>
        </div>
      )}
      {/* Success Alert Message */}
      {fieldSuccess && (
        <div
          role="alert"
          className="alert alert-success my-5 flex place-content-center max-w-120 md:max-w-200 mx-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{fieldSuccess}</span>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset space-y-5 md:space-y-10">
          <div className="flex-row md:flex md:space-x-8 space-y-5 md:space-y-0">
            {/* firstname */}
            <div className="w-full">
              <legend className="fieldset-legend">First name</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="firstname"
                {...register("firstname")}
              />
              {errors.firstname && (
                <p className="text-red-600 text-sm mt-2">
                  {errors.firstname.message}
                </p>
              )}
            </div>
            {/* lastname */}
            <div className="w-full">
              <legend className="fieldset-legend">Last name</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="lastname"
                {...register("lastname")}
              />
              {errors.lastname && (
                <p className="text-red-600 text-sm mt-2">
                  {errors.lastname.message}
                </p>
              )}
            </div>
            {/* ID */}
            <div className="w-full">
              <legend className="fieldset-legend">Supervisor ID</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Type your ID number"
                {...register("userId")}
              />
              {errors.userId && (
                <p className="text-red-600 text-sm mt-2">
                  {errors.userId.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex-row md:flex md:space-x-8 space-y-5 md:space-y-0">
            {/* email */}
            <div className="w-full">
              <legend className="fieldset-legend">Supervisor email</legend>
              <input
                type="email"
                className="input w-full"
                placeholder="mail@ub.bw"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>
            {/* phone */}
            <div className="w-full">
              <legend className="fieldset-legend">Phone number</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Phone"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-red-600 text-sm mt-2">
                  {errors.phone.message}
                </p>
              )}
            </div>
            {/* office */}
            <div className="w-full">
              <legend className="fieldset-legend">Office</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="e.g. 247/292"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-red-600 text-sm mt-2">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex-row md:flex md:space-x-8 space-y-5 md:space-y-0">
            {/* role */}
            <div className="w-full my-auto">
              <legend className="fieldset-legend">Role</legend>
              <select className="select w-full" {...register("programme")}>
                <option value={"SUPERVISOR"}>Supervisor</option>
                <option value={"COORDINATOR"}>Coordinator</option>
              </select>
            </div>
            {/* password */}
            <div className="w-full">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input w-full"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>
            {/* confirm password */}
            <div className="w-full">
              <legend className="fieldset-legend">Confirm password</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm mt-2">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-4/13 mb-5 mx-auto">
            Register
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default RegisterSupervisorForm;
