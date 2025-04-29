import React from "react";
import RegisterSupervisorForm from "../components/RegisterSupervisorForm";

const registerSupervisorPage = () => {
  return (
    <div>
      <h1 className="text-2xl">Register Supervisor</h1>
      <div className="divider mt-2 mb-6"></div>
      <RegisterSupervisorForm />
    </div>
  );
};

export default registerSupervisorPage;
