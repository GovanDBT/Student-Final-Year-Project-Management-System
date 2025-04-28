"use client";
import { useQuery } from "@tanstack/react-query";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { Deadline } from "@prisma/client";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { createSubmissionSchema } from "@/app/validationSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

type FormDataSchema = z.infer<typeof createSubmissionSchema>;

interface CloudinaryResult {
  public_id: string;
  secure_url: string;
}

const SubmissionForm = () => {
  const [uploadedFile, setUploadedFile] = useState<CloudinaryResult | null>(
    null
  );
  const [fieldError, setFieldError] = useState(""); // error hook
  const [fieldSuccess, setFieldSuccess] = useState(""); // error hook
  const [selectedDeadline, setSelectedDeadline] = useState<Deadline | null>(
    null
  ); // State to store the selected deadline
  const router = useRouter(); // router

  // retrieves the roles of users
  const { data: deadlineTitles, error } = useQuery<Deadline[]>({
    queryKey: ["deadlineTitles"],
    queryFn: () => axios.get("/api/submission/type").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (error) return null;

  // react forms
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormDataSchema>({
    resolver: zodResolver(createSubmissionSchema),
  });

  // submit form function
  const onSubmit = async (data: FormDataSchema) => {
    try {
      await axios.post("/api/submission", data);
      setFieldSuccess("Submission was Successfully!");
    } catch (error) {
      setFieldError("An unexpected error has occurred!");
    }
  };

  // Handle deadline selection
  const handleDeadlineChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedId = Number(event.target.value); // Convert to number
    const deadline = deadlineTitles?.find((d) => d.id === selectedId);
    setSelectedDeadline(deadline || null);
    setValue("deadlineId", selectedId); // Update the form value as a number
  };

  return (
    <>
      {console.log(errors)}
      {/* Error Alert Message */}
      {fieldError && (
        <div role="alert" className="alert alert-error alert-soft mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{fieldError}</span>
        </div>
      )}
      {/* Success Alert Message */}
      {fieldSuccess && (
        <div role="alert" className="alert alert-success alert-soft mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{fieldSuccess}</span>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
        {/* Submission title */}
        <div className="mb-2">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-sm">
              Type of Submission
            </legend>
            <select
              className="select w-full"
              {...register("deadlineId", { valueAsNumber: true })}
              onChange={handleDeadlineChange}
            >
              <option value="report">Report - weekly</option>
              {deadlineTitles?.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.title} - {new Date(type.deadlineDate).toDateString()}
                </option>
              ))}
            </select>
          </fieldset>
          {errors.deadlineId && (
            <p className="text-red-600 mt-2">{errors.deadlineId.message}</p>
          )}
          {/* Show description if isSubmittable is true */}
          {selectedDeadline?.isSubmittable && (
            <p className="text-sm mt-2">
              Requirements: {selectedDeadline.description}
            </p>
          )}
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
              {...register("description")}
            ></textarea>
            <p className="label m-0">(optional)</p>
          </fieldset>
          {errors.description && (
            <p className="text-red-600 mt-2">{errors.description.message}</p>
          )}
        </div>
        {/* Upload File */}
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
              clientAllowedFormats: ["pdf"], // Restrict to PDF files
              maxFileSize: 5 * 1024 * 1024, // 5 MB
            }}
            onSuccess={(result) => {
              const fileInfo = result.info as CloudinaryResult;
              setUploadedFile(fileInfo);
              setValue("fileURL", fileInfo.secure_url);
            }}
          >
            {({ open }) => {
              return (
                <a
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default behavior
                    if (open) {
                      open(); // Open the Cloudinary widget
                    } else {
                      console.error(
                        "Cloudinary widget open function is undefined."
                      );
                    }
                  }}
                >
                  <FaCloudUploadAlt />
                  Upload File
                </a>
              );
            }}
          </CldUploadWidget>
          {errors.fileURL && (
            <p className="text-red-600 mt-2">{errors.fileURL.message}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default SubmissionForm;
