import { z } from "zod";
import { patterns } from "../../constants";

export const schema = z
  .intersection(
    z.object({
      name: z.string().min(1, { message: "Name is required" }),
      email: z
        .string()
        .min(1, { message: "Email is required" })
        .refine((text) => patterns.email.test(text), {
          message: "Email is not valid",
        }),
      states: z.array(z.string()).min(1).max(2),
      languages: z.array(z.string()),
      gender: z.string().min(1),
      skills: z.array(z.string()).max(2),
      registrationDateTime: z.date(),
      formerEmploymentPerion: z.array(z.date()).min(2).max(2),
      salaryRange: z.array(z.number()).min(2).max(2),
      isTeacher: z.boolean(),
    }),

    z.discriminatedUnion("variant", [
      z.object({ variant: z.literal("create") }),
      z.object({ variant: z.literal("edit"), id: z.string().min(1) }),
    ])
  )
  .and(
    z.union([
      z.object({ isTeacher: z.literal(false) }),
      z.object({
        isTeacher: z.literal(true),
        students: z.array(z.object({ name: z.string().min(4) })),
      }),
    ])
  );

export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  variant: "create",
  name: "",
  email: "",
  states: [],
  languages: [],
  gender: "",
  skills: [],
  registrationDateTime: new Date(),
  formerEmploymentPerion: [new Date(), new Date()],
  salaryRange: [0, 70],
  isTeacher: false,
};
