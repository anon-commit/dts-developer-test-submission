import { z } from "zod";
import {
  SortOrderSchema,
  ByStatusCursorSchema,
  ByCreatedCursorSchema,
} from "../routes/tasks.schemas";

export type SortOrder = z.infer<typeof SortOrderSchema>;
export type ByCreatedCursor = z.infer<typeof ByCreatedCursorSchema>;
export type ByStatusCursor = z.infer<typeof ByStatusCursorSchema>;
