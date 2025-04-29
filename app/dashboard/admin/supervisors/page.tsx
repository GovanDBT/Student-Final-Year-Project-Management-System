import React from "react";
import AllSupervisorsTable from "../components/AllSupervisorsTable";
import AllCoordinatorsTable from "../components/AllCoordinatorsTable";

const SupervisorsPage = () => {
  return (
    <div>
      <h1 className="text-2xl">All Supervisors + Coordinators</h1>
      <div className="divider mt-2 mb-6"></div>
      <h3>Coordinators:</h3>
      <AllCoordinatorsTable />
      <h3>Supervisors:</h3>
      <AllSupervisorsTable />
    </div>
  );
};

export default SupervisorsPage;
