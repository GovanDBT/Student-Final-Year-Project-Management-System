import React from "react";
import NavBar from "../components/NavBar";
import SupervisorTable from "./SupervisorTable";

const SupervisorsPage = () => {
  return (
    <>
      <NavBar />
      <div className="container mx-auto">
        <h1 className="mb-5">Supervisors List</h1>
        <SupervisorTable />
      </div>
    </>
  );
};

export default SupervisorsPage;
