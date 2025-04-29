"use client";
import { z } from "zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createUserSchema } from "@/app/validationSchema";

// interface for registration form
type SignupFormData = z.infer<typeof createUserSchema>;

const SignupForm = () => {
  const [fieldError, setFieldError] = useState(""); // hook for showing errors messages
  const [fieldSuccess, setFieldSuccess] = useState(""); // hook for showing success messages

  // react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(createUserSchema),
  });

  // onSubmit function
  const onSubmit = async (data: SignupFormData) => {
    try {
      await axios.post("/api/user", data); // send request
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
        <fieldset className="fieldset flex-col justify-items-center space-y-5 md:space-y-10">
          <div className="flex-row md:flex md:space-x-10 space-y-5 md:space-y-0">
            <div className="w-80">
              <legend className="fieldset-legend">First name</legend>
              <input
                type="text"
                className="input"
                placeholder="firstname"
                {...register("firstname")}
              />
              {errors.firstname && (
                <p className="text-red-600 text-sm mt-2">
                  {errors.firstname.message}
                </p>
              )}
            </div>
            <div className="w-80">
              <legend className="fieldset-legend">Last name</legend>
              <input
                type="text"
                className="input"
                placeholder="lastname"
                {...register("lastname")}
              />
              {errors.lastname && (
                <p className="text-red-600 text-sm mt-2">
                  {errors.lastname.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex-row md:flex md:space-x-10 space-y-5 md:space-y-0">
            <div className="w-80">
              <legend className="fieldset-legend">Student ID?</legend>
              <input
                type="text"
                className="input"
                placeholder="Type your ID number"
                {...register("userId")}
              />
              {errors.userId && (
                <p className="text-red-600 text-sm mt-2">
                  {errors.userId.message}
                </p>
              )}
            </div>

            <div className="w-80">
              <legend className="fieldset-legend">Student email?</legend>
              <input
                type="email"
                className="input"
                placeholder="mail@ub.bw"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex-row md:flex md:space-x-10 space-y-5 md:space-y-0">
            <div className="w-80">
              <legend className="fieldset-legend">Phone number?</legend>
              <input
                type="text"
                className="input"
                placeholder="Phone"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-red-600 text-sm mt-2">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="w-80 my-auto ">
              <legend className="fieldset-legend">Choose Program</legend>
              <select className="select" {...register("programme")}>
                <option>BSC_COMPUTER_SCIENCE</option>
                <option>BSC_INFORMATION_TECHNOLOGY</option>
                <option>BSC_COMPUTING_WITH_FINANCE</option>
                <option>BSC_COMPUTER_INFORMATION_SYSTEMS</option>
              </select>
            </div>
          </div>

          <div className="flex-row md:flex md:space-x-10 space-y-5 md:space-y-0">
            <div className="w-80">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input"
                placeholder="Password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="w-80">
              <legend className="fieldset-legend">Confirm password</legend>
              <input
                type="text"
                className="input"
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

          <button className="btn btn-primary w-4/10 mb-5">Submit</button>
        </fieldset>
      </form>
    </div>
  );
};

export default SignupForm;
