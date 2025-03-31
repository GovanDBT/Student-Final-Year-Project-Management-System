"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from "@/app/validationSchema";
import { z } from "zod";
import NavBar from "../components/NavBar";

// interface for registration form
type RegistrationForm = z.infer<typeof createUserSchema>;

const RegistrationPage = () => {
  const router = useRouter(); // router
  const [fieldError, setFieldError] = useState(""); // hook for showing errors

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationForm>({
    resolver: zodResolver(createUserSchema),
  });

  return (
    <>
      <NavBar />
      <div className="container mx-auto">
        {fieldError && (
          <div role="alert" className="alert alert-error my-5">
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
        <div className="flex-row justify-items-center text-center mx-auto max-w-8/10 md:max-w-6/10  mb-4">
          <Image
            src="/ub-logo.png"
            className="mb-3"
            alt="UB logo"
            width={90}
            height={70}
          />
          <p>
            Student’s eligible to register for their final year project should
            meet the prerequisite requirements of{" "}
            <span className="font-bold">CSI-315</span>,{" "}
            <span className="font-bold">CSI-444</span>,{" "}
            <span className="font-bold">CSI-430</span>, and{" "}
            <span className="font-bold">CSI-215</span>
          </p>
        </div>
        <form
          onSubmit={handleSubmit(async (data) => {
            try {
              console.log("Form data:", data); // Log the form data for debugging
              await axios.post("/api/register", data);
              router.push("/");
            } catch (error) {
              setFieldError("An unexpected error has occurred");
            }
          })}
        >
          <fieldset className="fieldset flex-col justify-items-center space-y-5 md:space-y-10">
            <div className="flex-row md:flex md:space-x-10 space-y-5 md:space-y-0">
              <div className="w-80">
                <legend className="fieldset-legend">First name</legend>
                <input
                  type="text"
                  className="input"
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
                  required
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
    </>
  );
};

export default RegistrationPage;
