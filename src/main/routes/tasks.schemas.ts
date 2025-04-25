import { z } from "zod";

const StatusEnum = z.enum(["TODO", "IN_PROGRESS", "DONE"]);

const IdSchema = z.coerce
  .number({ message: "ID is required and must be a number" })
  .int({ message: "ID must be an integer" })
  .min(1, { message: "ID must be > 0" });

const DateSchema = z
  .string({ message: "A date and time is required" })
  .datetime({
    message:
      "Invalid datetime format. Datetimes must be supplied in ISO 8601 format with the UTC time zone designator.",
  })
  .transform((str) => new Date(str));

export const TaskIdParamSchema = z.object({
  id: IdSchema,
});

export const CreateTaskSchema = z.object({
  title: z
    .string({ message: "Title is required" })
    .min(1, { message: "Title cannot be blank" }),
  description: z.string().optional(),
  status: StatusEnum.default("TODO"),
  due_date: DateSchema.refine(
    (date) => {
      return date > new Date(); // true if date is in the future
    },
    { message: "Due date must be in the future" },
  ),
});

export const UpdateStatusSchema = z.object({
  status: StatusEnum,
});

export const ByCreatedCursorSchema = z.object({
  prevId: IdSchema,
  prevCreatedAt: DateSchema,
});

export const ByStatusCursorSchema = z.object({
  prevId: IdSchema,
  prevStatus: StatusEnum,
});

export const ByDueDateCursorSchema = z.object({
  prevId: IdSchema,
  prevDueDate: DateSchema,
});

export const PaginationQuerySchema = z.object({
  sortBy: z.enum(["created", "status", "dueDate"]).default("created"),
  sortOrder: z.enum(["ASC", "DESC"]).default("DESC"),
  pageSize: z.coerce
    .number({ message: "Page size is required must be a number" })
    .int({ message: "Page size must be an integer" }),
  cursor: z
    .string()
    .base64({ message: "Cursor must be base64 encoded" })
    .optional(),
});
