import React from "react";

const DeadlineForm = () => {
  return (
    <>
      <form action="">
        <h2>Deadlines Form</h2>
        <div className="mb-2">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm">Deadline Title</legend>
            <input
              type="text"
              className="input w-full"
              placeholder="e.g. Beta Version Deadline"
            />
          </fieldset>
        </div>
        <div className="mb-2">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm">
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
        <div className="mb-3">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm">Deadline Date</legend>
            <input type="datetime-local" className="input w-full" />
          </fieldset>
        </div>
        <div className="mb-8">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm">
              Is Submission Expected?
            </legend>
            <select className="select w-full">
              <option value="false">Non-submittable</option>
              <option value="true">Submittable</option>
            </select>
          </fieldset>
        </div>
        <button className="btn btn-primary">Set Deadline</button>
      </form>
    </>
  );
};

export default DeadlineForm;
