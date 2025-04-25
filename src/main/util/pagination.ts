import Task from "../models/task";
import {
  ByCreatedCursorSchema,
  ByStatusCursorSchema,
} from "../routes/tasks.schemas";
import type { IGetAllTasksResult as ITask } from "../queries/taskQueries.queries";
import type { ByCreatedCursor, ByStatusCursor } from "./types";

export function decodeCursor(cursor: string) {
  return JSON.parse(Buffer.from(cursor, "base64").toString());
}

export function encodeCursor(cursor: ByStatusCursor | ByCreatedCursor) {
  return Buffer.from(JSON.stringify(cursor)).toString("base64");
}

export const strategies = {
  created: {
    getTasks: Task.getTasksByCreated,
    cursorSchema: ByCreatedCursorSchema,
    getNextCursor: (lastTask: ITask) => ({
      prevId: lastTask.id,
      prevCreatedAt: lastTask.created_at,
    }),
  },
  status: {
    getTasks: Task.getTasksByStatus,
    cursorSchema: ByStatusCursorSchema,
    getNextCursor: (lastTask: ITask) => ({
      prevId: lastTask.id,
      prevStatus: lastTask.status,
    }),
  },
};
