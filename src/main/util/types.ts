import { z } from "zod";
import {
  ByStatusCursorSchema,
  ByCreatedCursorSchema,
} from "../routes/tasks.schemas";

export type SortOrder = "ASC" | "DESC";

export type ByCreatedCursor = z.infer<typeof ByCreatedCursorSchema>;
export type ByStatusCursor = z.infer<typeof ByStatusCursorSchema>;
