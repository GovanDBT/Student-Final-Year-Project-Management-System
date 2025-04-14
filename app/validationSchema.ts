import { z } from "zod";

// Project Schema
export const createProjectSchema = z.object({
    title: z.string().min(1, 'Project Title is Required!').max(255),
    description: z.string().min(1, 'Project Description is Required!'),
    supervisorId: z.string().min(1, 'Project Supervisor is Required!')
});

export const updateProjectSchema = z.object({
  title: z.string().min(1, 'Project Title is Required!').max(255).optional(),
  description: z.string().min(1, 'Project Description is Required!').optional(),
  supervisorId: z.string().min(1, 'Project Supervisor is Required!').optional(),
  status: z.string().optional()
})

// User Schema
export const createUserSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  userId: z.string().min(1, "Student ID is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone number must be at least 8 digits"),
  programme: z.enum([
    "BSC_COMPUTER_SCIENCE",
    "BSC_INFORMATION_TECHNOLOGY",
    "BSC_COMPUTING_WITH_FINANCE",
    "BIS_COMPUTER_INFORMATION_SYSTEMS",
  ]),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Comment Schema
export const createCommentSchema = z.object({
    comment: z.string().min(1, 'Comment is Required!'),
    status: z.enum(["PENDING", "APPROVED", "REJECTED", "COMPLETED"]),
});
