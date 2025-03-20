import React from "react";
import NavBar from "../components/NavBar";
import SupervisorTable from "./SupervisorTable";

const SupervisorsPage = () => {
  return (
    <>
      <NavBar />
      <div className="container mx-auto">
        <div className="mb-5 max-w-3xl">
          <h1>Supervisors List</h1>
          <p>
            The table below show a list of all supervisor for this current final
            year project. This list is meant to be used by student to help them
            get in contact with their supervisors
          </p>
        </div>
        <SupervisorTable />
      </div>
    </>
  );
};

export default SupervisorsPage;
