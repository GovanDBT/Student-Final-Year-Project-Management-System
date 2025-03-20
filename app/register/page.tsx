import React from "react";
import NavBar from "../components/NavBar";

const RegistrationPage = () => {
  return (
    <>
      <NavBar />
      <div className="container mx-auto">
        <form action="" className="w-full">
          <fieldset className="fieldset flex flex-col items-center">
            <div className="w-70">
              <legend className="fieldset-legend">What is your fullname</legend>
              <input
                type="input"
                className="input validator"
                required
                placeholder="fullname"
                pattern="[A-Za-z][A-Za-z]*"
                minLength={3}
                maxLength={30}
                title="Only letters"
              />
              <p className="validator-hint">
                Must be 3 to 30 characters
                <br />
                containing only letters
              </p>
            </div>

            <div className="w-70">
              <legend className="fieldset-legend">
                What is your student ID?
              </legend>
              <input
                type="number"
                className="input validator"
                required
                placeholder="Type your ID number"
                title="student ID"
              />
            </div>

            <div className="w-70">
              <legend className="fieldset-legend">
                What is your student email?
              </legend>
              <input
                className="input validator"
                type="email"
                required
                placeholder="mail@ub.bw"
              />
              <div className="validator-hint">Enter valid email address</div>
            </div>

            <div className="w-70">
              <legend className="fieldset-legend">
                What is your phone number?
              </legend>
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
              <p className="validator-hint">Must be 8 digits long</p>
            </div>

            <div className="w-70">
              <select className="select validator" required>
                <option disabled selected>
                  Choose Programme:
                </option>
                <option>BSC_COMPUTER_SCIENCE</option>
                <option>BSC_INFORMATION_TECHNOLOGY</option>
                <option>BSC_COMPUTING_WITH_FINANCE</option>
                <option>BIS_COMPUTER_INFORMATION_SYSTEMS</option>
              </select>
              <p className="validator-hint">Choose your major programme</p>
            </div>

            <div className="w-70">
              <legend className="fieldset-legend">Enter password</legend>
              <input
                type="password"
                className="input validator"
                required
                placeholder="Password"
                minLength={8}
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              />
              <p className="validator-hint">
                Must be more than 8 characters, including
                <br />
                At least one number
                <br />
                At least one lowercase letter
                <br />
                At least one uppercase letter
              </p>
            </div>

            <div className="w-70">
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
              <p className="validator-hint">
                Must be more than 8 characters, including
                <br />
                At least one number
                <br />
                At least one lowercase letter
                <br />
                At least one uppercase letter
              </p>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default RegistrationPage;
