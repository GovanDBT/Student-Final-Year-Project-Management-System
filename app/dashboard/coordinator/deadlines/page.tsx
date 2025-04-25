import React from "react";
import DeadlineForm from "../components/DeadlineForm";
import DeadlinesTable from "../components/DeadlinesTable";

const DeadlinesPage = () => {
  return (
    <div className="container mx-auto">
      <h1>Deadlines</h1>
      <div className="divider mt-2 mb-6"></div>
      <div className="grid md:grid-cols-2 md:gap-5 gap-10">
        <div>
          <DeadlineForm />
        </div>
        <div className="md:border-l-1 md:pl-5 ">
          <h2 className="mb-4">Deadline Table</h2>
          <DeadlinesTable />
        </div>
      </div>
    </div>
  );
};

export default DeadlinesPage;
