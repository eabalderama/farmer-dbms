import z from "zod";

export const CredentialSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string(),
});
