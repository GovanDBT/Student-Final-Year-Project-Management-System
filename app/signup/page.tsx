import Image from "next/image";
import NavBar from "../components/NavBar";
import SignupForm from "../components/SignupForm";

const SignupPage = () => {
  return (
    <>
      <NavBar />
      <div className="container mx-auto">
        {/* Description */}
        <div className="flex-row justify-items-center text-center mx-auto max-w-8/10 md:max-w-6/10 mb-4">
          <Image
            src="/ub-logo.png"
            className="mb-3"
            alt="UB logo"
            width={90}
            height={70}
          />
          <h1 className="mb-2">Student Registration Form</h1>
          <p>
            Students eligible to register for their final year project should
            meet the prerequisite requirements of CSI-315, CSI-444, CSI-430, and
            CSI-215
          </p>
        </div>
        <SignupForm />
      </div>
    </>
  );
};

export default SignupPage;
