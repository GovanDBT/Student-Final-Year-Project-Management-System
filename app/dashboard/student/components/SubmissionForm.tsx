"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { Deadline } from "@prisma/client";
import { FaCloudUploadAlt } from "react-icons/fa";

interface CloudinaryResult {
  public_id: string;
  secure_url: string;
}

const SubmissionForm = () => {
  const [uploadedFile, setUploadedFile] = useState<CloudinaryResult | null>(
    null
  );
  // retrieves the roles of users
  const { data: deadlineTitles, error } = useQuery<Deadline[]>({
    queryKey: ["deadlineTitles"],
    queryFn: () => axios.get("/api/submission/type").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (error) return null;

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
              {deadlineTitles?.map((type) => (
                <option key={type.id} value={type.title}>
                  {type.title} - {new Date(type.deadlineDate).toDateString()}
                </option>
              ))}
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
        {/* <div className="mb-8">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm">Pick a file</legend>
            <input type="file" className="file-input" />
            <label className="label">Max size 5MB</label>
          </fieldset>
        </div> */}
        {/* Uploaded File Preview */}
        {uploadedFile && (
          <div className="mb-4">
            <p className="text-sm inline font-bold">Uploaded File: </p>
            <a
              href={uploadedFile.secure_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Open Uploaded File
            </a>
          </div>
        )}
        <div className="my-8">
          <CldUploadWidget
            uploadPreset="fypmsuploads"
            options={{
              sources: ["local"],
              maxFiles: 5,
              resourceType: "raw",
              clientAllowedFormats: ["pdf"], // Restrict to PDF files
              maxFileSize: 5 * 1024 * 1024, // 5 MB
            }}
            onSuccess={(result) => {
              const fileInfo = result.info as CloudinaryResult;
              setUploadedFile(fileInfo);
            }}
          >
            {({ open }) => {
              return (
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default behavior
                    open(); // Open the Cloudinary widget
                  }}
                >
                  <FaCloudUploadAlt />
                  Upload File
                </button>
              );
            }}
          </CldUploadWidget>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SubmissionForm;
