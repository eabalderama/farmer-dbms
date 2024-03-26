import { roles } from "@prisma/client";
import z from "zod";

export const CredentialSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string(),
});

export const CreateUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().min(1).email(),
  picture: z.string().optional().nullable(),
  contact_number: z
    .string()
    .min(13, "Contact number must have at least 13 character(s)")
    .max(13, "Contact number must not be more than 13 characters(s)")
    .regex(
      new RegExp(/^\+63{1}[0-9]{3,14}$/),
      "Contact number must follow the correct format"
    ),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, "Must be at least 8 characters")
    .regex(new RegExp(".*[A-Z].*"), "Must have atleast one uppercase character")
    .regex(new RegExp(".*[a-z].*"), "Must have atleast one lowercase character")
    .regex(new RegExp(".*\\d.*"), "Must have atleast one number")
    .regex(
      new RegExp(".*[`~<>?,./!@#$%^&*()\\-_+=\"'|{}\\[\\];:\\\\].*"),
      "Must have atleast one special character"
    ),
  role: z.enum([roles.ADMIN, roles.WORKER]).optional(),
});

export const CreateExpertiseSchema = z.object({
  name: z.string().min(3),
});

export const CreateInputTypeSchema = z.object({
  input_name: z.string().min(3),
});

export const CreateCropSchema = z.object({
  crop_name: z.string().min(3),
});

export const CreateFarmerSchema = z.object({
  name: z.string().min(3),
  contact_number: z
    .string()
    .min(13, "Contact number must have at least 13 character(s)")
    .max(13, "Contact number must not be more than 13 characters(s)")
    .regex(
      new RegExp(/^\+63{1}[0-9]{3,14}$/),
      "Contact number must follow the correct format"
    )
    .optional(),
  email: z.string().min(1).email(),
  address: z.string().min(3).optional(),
  farm_name: z.string().min(3).optional(),
  assigned_workers: z.array(z.number()),
});
