import { z } from "zod";
import {
  ByStatusCursorSchema,
  ByCreatedCursorSchema,
  ByDueDateCursorSchema,
} from "../routes/tasks.schemas";

export type ByCreatedCursor = z.infer<typeof ByCreatedCursorSchema>;
export type ByStatusCursor = z.infer<typeof ByStatusCursorSchema>;
export type ByDueDateCursor = z.infer<typeof ByDueDateCursorSchema>;

export type Cursors = ByCreatedCursor | ByStatusCursor | ByDueDateCursor;
