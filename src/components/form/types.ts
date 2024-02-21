import { z } from "zod";

// eslint-disable-next-line react-refresh/only-export-components
export const formSchema = z
  .object({
    firstName: z.string().min(1, "You must provide a first name"),
    lastName: z.string().min(1, "You must provide a last name"),
    phone: z.string().min(1).optional(),
    email: z.string().email().optional(),
    subject: z.string().min(1, "You must select a subject"),
    feedback: z.string().min(1),
    terms: z.coerce.boolean().refine((c) => c === true, {
      message: "You must consent to the processing of your personal data",
    }),
  })
  .refine((data) => data.phone || data.email, {
    message: "You must provide a phone number or an email address",
    path: ["phone", "email"],
  });

export type FormValues = z.infer<typeof formSchema>;
