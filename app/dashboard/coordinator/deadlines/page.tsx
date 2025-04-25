import React from "react";
import DeadlineForm from "../components/DeadlineForm";

const DeadlinesPage = () => {
  return (
    <div className="container mx-auto">
      DeadlinesPage
      <div className="grid md:grid-cols-2 md:gap-5 gap-10">
        <DeadlineForm />
        <h1 className="md:border-l-1 md:pl-5 ">Deadline Table</h1>
      </div>
    </div>
  );
};

export default DeadlinesPage;
