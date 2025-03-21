"use client";
import Image from "next/image";
import NavBar from "../components/NavBar";

const RegistrationPage = () => {
  return (
    <>
      <NavBar />
      <div className="container mx-auto">
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
        <form action="">
          <fieldset className="fieldset flex-col justify-items-center space-y-5 md:space-y-10">
            <div className="flex-row md:flex md:space-x-10 space-y-5 md:space-y-0">
              <div className="w-80">
                <legend className="fieldset-legend">First name</legend>
                <input
                  type="input"
                  className="input validator"
                  required
                  placeholder="firstname"
                  pattern="[A-Za-z][A-Za-z]*"
                  minLength={2}
                  maxLength={30}
                  title="Only letters"
                />
                <p className="validator-hint hidden">
                  Must be 2 to 30 characters
                  <br />
                  containing only letters
                </p>
              </div>
              <div className="w-80">
                <legend className="fieldset-legend">Last name</legend>
                <input
                  type="input"
                  className="input validator"
                  required
                  placeholder="lastname"
                  pattern="[A-Za-z][A-Za-z]*"
                  minLength={2}
                  maxLength={30}
                  title="Only letters"
                />
                <p className="validator-hint hidden">
                  Must be 2 to 30 characters
                  <br />
                  containing only letters
                </p>
              </div>
            </div>

            <div className="flex-row md:flex md:space-x-10 space-y-5 md:space-y-0">
              <div className="w-80">
                <legend className="fieldset-legend">Student ID?</legend>
                <input
                  type="number"
                  className="input validator"
                  required
                  placeholder="Type your ID number"
                  title="student ID"
                />
              </div>

              <div className="w-80">
                <legend className="fieldset-legend">Student email?</legend>
                <input
                  className="input validator"
                  type="email"
                  required
                  placeholder="mail@ub.bw"
                />
                <div className="validator-hint hidden">
                  Enter valid email address
                </div>
              </div>
            </div>

            <div className="flex-row md:flex md:space-x-10 space-y-5 md:space-y-0">
              <div className="w-80">
                <legend className="fieldset-legend">Phone number?</legend>
                <input
                  type="tel"
                  className="input validator tabular-nums"
                  required
                  placeholder="Phone"
                  pattern="[0-9]*"
                  minLength={8}
                  maxLength={8}
                  title="Must be 8 digits"
                />
                <p className="validator-hint hidden">Must be 8 digits long</p>
              </div>

              <div className="w-80 my-auto mt-7.5">
                <select className="select validator " required>
                  <option disabled selected>
                    Choose Programme:
                  </option>
                  <option>BSC_COMPUTER_SCIENCE</option>
                  <option>BSC_INFORMATION_TECHNOLOGY</option>
                  <option>BSC_COMPUTING_WITH_FINANCE</option>
                  <option>BIS_COMPUTER_INFORMATION_SYSTEMS</option>
                </select>
                <p className="validator-hint hidden">
                  Choose your major programme
                </p>
              </div>
            </div>

            <div className="flex-row md:flex md:space-x-10 space-y-5 md:space-y-0">
              <div className="w-80">
                <legend className="fieldset-legend">Password</legend>
                <input
                  type="password"
                  className="input validator"
                  required
                  placeholder="Password"
                  minLength={8}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                />
                <p className="validator-hint hidden">
                  Must be more than 8 characters, including
                  <br />
                  At least one number
                  <br />
                  At least one lowercase letter
                  <br />
                  At least one uppercase letter
                </p>
              </div>

              <div className="w-80">
                <legend className="fieldset-legend">Confirm password</legend>
                <input
                  type="password"
                  className="input validator"
                  required
                  placeholder="Password"
                  minLength={8}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                />
                <p className="validator-hint hidden">
                  Must be more than 8 characters, including
                  <br />
                  At least one number
                  <br />
                  At least one lowercase letter
                  <br />
                  At least one uppercase letter
                </p>
              </div>
            </div>

            <button
              className="btn btn-primary w-4/10"
              onClick={() => console.log("clicked")}
            >
              Submit
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default RegistrationPage;
