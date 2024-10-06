import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
// Define the schema
export const signupSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.object({
    firstName: z.string().min(1, "First name is required"),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Last name is required"),
  }),
  email: z.string().email("Invalid email address"),
  phone: z.string(),
  address: z.string().min(1, "Address is required"),
});
