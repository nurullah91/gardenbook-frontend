import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const forgetPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export const resetPasswordSchema = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string().nonempty({ message: "Old Password cannot be empty" }),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
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

export const CommentSchema = z.object({
  comment: z.string().min(1, { message: "Write something" }),
});

export const updateUserSchema = z.object({
  name: z.object({
    firstName: z.string().min(1, "First name is required").optional(),
    middleName: z.string().optional(),
    lastName: z.string().min(1, "Last name is required").optional(),
  }),
  phone: z.string().min(7, "Please enter a valid phone number").optional(),
  address: z.string().min(1, "Address cannot be empty").optional(),
  bio: z.string().min(1, "Bio cannot be empty").optional(),
});
