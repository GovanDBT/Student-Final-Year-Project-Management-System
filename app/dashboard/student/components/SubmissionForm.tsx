import React from "react";

const SubmissionForm = () => {
  return (
    <div>
      <form action="" className="mb-8">
        {/* Submission title */}
        <div className="mb-2">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm">
              Type of Submission
            </legend>
            <select className="select w-full">
              <option value="false">Report - weekly</option>
              <option value="false">Beta Version</option>
              <option value="true">Alpha Version</option>
            </select>
          </fieldset>
        </div>
        {/* Submission Description */}
        <div className="mb-2">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm">
              Submission Description
            </legend>
            <textarea
              className="textarea w-full"
              placeholder="e.g. document of my weekly report..."
            ></textarea>
            <p className="label m-0">(optional)</p>
          </fieldset>
        </div>
        {/* Upload File */}
        <div>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm">Pick a file</legend>
            <input type="file" className="file-input" />
            <label className="label">Max size 5MB</label>
          </fieldset>
        </div>
      </form>
    </div>
  );
};

export default SubmissionForm;
