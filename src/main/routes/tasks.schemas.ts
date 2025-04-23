import { z } from "zod";

export const StatusEnum = z.enum(["TODO", "IN_PROGRESS", "DONE"], {
  message: "status must be one of the following: 'TODO', 'IN_PROGRESS', 'DONE'",
});

export const TaskIdParamSchema = z.object({
  id: z.coerce
    .number({ message: "Task ID must be a number" })
    .min(1, { message: "ID must be > 0" }),
});

export const DateSchema = z
  .string({ message: "Due date is required" })
  .datetime({
    message:
      "Invalid due_date format. Dates must be supplied in ISO 8601 format with the UTC time zone designator.",
  })
  .transform((str) => new Date(str));

export const CreateTaskSchema = z.object({
  title: z
    .string({ message: "Title is required" })
    .min(1, { message: "Title cannot be blank" }),
  description: z.string().optional(),
  status: StatusEnum.default("TODO"),
  due_date: DateSchema.refine((date) => {
    return date > new Date(); // true if date is in the future
  }, {message: "Due date must be in the future"}),
});

export const UpdateStatusSchema = z.object({
  status: StatusEnum,
});
