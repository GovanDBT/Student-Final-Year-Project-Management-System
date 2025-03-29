import { z } from "zod";

// Input Validation
export const createProjectSchema = z.object({
    title: z.string().min(1, 'Project Title is Required!').max(255),
    description: z.string().min(1, 'Project Description is Required!')
});
