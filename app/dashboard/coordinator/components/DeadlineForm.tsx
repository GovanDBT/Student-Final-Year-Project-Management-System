import React from "react";

const DeadlineForm = () => {
  return (
    <>
      <form action="">
        <div className="mb-2">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-lg">Deadline Title</legend>
            <input
              type="text"
              className="input w-full"
              placeholder="e.g. Beta Version Deadline"
            />
          </fieldset>
        </div>
        <div className="mb-2">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-lg">
              Deadline Description
            </legend>
            <textarea
              className="textarea w-full"
              placeholder="e.g. Expected to submit documentation, presentation slide, ..."
            ></textarea>
            <p className="label m-0">
              Write down what students are expected to submit
            </p>
          </fieldset>
        </div>
        <div className="mb-8">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-lg">Deadline Date</legend>
            <input type="date" className="input w-full" />
          </fieldset>
        </div>
        <button className="btn btn-primary">Set Deadline</button>
      </form>
    </>
  );
};

export default DeadlineForm;
