import React from "react";
import DeadlineForm from "../components/DeadlineForm";

const DeadlinesPage = () => {
  return (
    <div className="container mx-auto">
      <h1>Deadlines</h1>
      <div className="divider mt-2 mb-6"></div>
      <div className="grid md:grid-cols-2 md:gap-5 gap-10">
        <DeadlineForm />
        <h2 className="md:border-l-1 md:pl-5 ">Deadline Table</h2>
      </div>
    </div>
  );
};

export default DeadlinesPage;
