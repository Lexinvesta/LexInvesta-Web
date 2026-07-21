import { z } from "zod";

export const studySchema = z.object({
  name: z
    .string()
    .min(2, { message: "validation.required" })
    .max(120, { message: "validation.required" }),
  phone: z
    .string()
    .regex(/^[6-9]\d{8}$/, { message: "validation.phone" }),
  email: z.string().email({ message: "validation.email" }),
  province: z
    .string()
    .min(2, { message: "validation.required" })
    .max(80, { message: "validation.required" }),
  debt: z
    .string()
    .min(1, { message: "validation.debtMin" }),
  debtType: z
    .string()
    .min(1, { message: "validation.required" }),
  situation: z
    .string()
    .min(1, { message: "validation.required" }),
  message: z.string().max(2000).optional().or(z.literal("")),
  gdprConsent: z.boolean().refine((v) => v === true, {
    message: "validation.required",
  }),
  turnstileToken: z
    .string()
    .min(1, { message: "validation.turnstileRequired" }),
});

export type StudyFormValues = z.infer<typeof studySchema>;

export const studyDefaultValues: StudyFormValues = {
  name: "",
  phone: "",
  email: "",
  province: "",
  debt: "",
  debtType: "",
  situation: "",
  message: "",
  gdprConsent: false,
  turnstileToken: "",
};
