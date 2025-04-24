import type { Context } from "hono";
import type { IGetAllTasksResult } from "../queries/taskQueries.queries.js";
import type { ByStatusCursor, ByCreatedCursor } from "../util/types.js";
import Task from "../models/task.js";
import { Hono } from "hono";
import { successResponse } from "../util/responseWrappers.js";
import {
  TaskIdParamSchema,
  CreateTaskSchema,
  UpdateStatusSchema,
  PaginationQuerySchema,
  ByStatusCursorSchema,
  ByCreatedCursorSchema,
} from "./tasks.schemas.js";

const tasks = new Hono();

/*
 * All routes that take parameters validate those parameters using Zod schemas.
 * Zod throws a `ZodError` when validation fails.
 *
 * Errors are handled at the top level in `index.ts` with the `app.onError` handler,
 * so try/catch blocks are not needed.
 *
 * When validation fails, a helpful error message (sourced from the given Zod schema)
 * is sent to the browser, in the standard response format defined in `./util/responseWrappers.ts`.
 */

/**
 * GET /tasks
 * Retrieves all tasks.
 */
tasks.get("/all", async (c: Context) => {
  const tasks = await Task.getAll();
  return c.json(successResponse(tasks), 200);
});

/**
 * GET /tasks/page
 * Retrieves tasks with pagination using cursor-based pagination.
 * Query parameters:
 * - sortBy: 'created' or 'status'
 * - sortOrder: 'ASC' or 'DESC'
 * - pageSize: number
 * - cursor: base64 encoded cursor for pagination (not required for first page)
 */
// TODO: This route is VERY messy. Refactor this to reduce repeated logic.
tasks.get("/page", async (c: Context) => {
  const queryValidation = PaginationQuerySchema.parse(c.req.query());

  let { sortBy, sortOrder, pageSize, cursor } = queryValidation;

  let page: IGetAllTasksResult[];
  let nextCursor: string | null;

  if (!cursor) {
    if (sortBy === "created") {
      page = await Task.getTasksByCreated(sortOrder, {
        pageSize: pageSize,
      });

      const lastTask = page[page.length - 1];

      const byCreatedCursor: ByCreatedCursor = {
        prevId: lastTask.id,
        prevCreatedAt: new Date(lastTask.created_at),
      };

      nextCursor = Buffer.from(JSON.stringify(byCreatedCursor)).toString(
        "base64",
      );
    } else {
      page = await Task.getTasksByStatus(sortOrder, {
        pageSize: pageSize,
      });

      const lastTask = page[page.length - 1];

      const statusCursor: ByStatusCursor = {
        prevStatus: lastTask.status,
        prevId: lastTask.id,
      };

      nextCursor = Buffer.from(JSON.stringify(statusCursor)).toString("base64");
    }

    return c.json(successResponse(page, { cursor: nextCursor }), 200);
  }

  // Decode cursor from base64, then parse it to JSON
  let prevCursor = JSON.parse(Buffer.from(cursor, "base64").toString());

  if (sortBy === "created") {
    prevCursor = ByCreatedCursorSchema.parse(prevCursor);

    const params = { ...prevCursor, pageSize: pageSize };

    page = await Task.getTasksByCreated(sortOrder, params);
  } else {
    prevCursor = ByStatusCursorSchema.parse(prevCursor);
    const params = { ...prevCursor, pageSize: pageSize };

    page = await Task.getTasksByStatus(sortOrder, params);
  }

  const hasMore = page.length === pageSize;

  if (hasMore) {
    const lastTask = page[page.length - 1];

    if (sortBy === "created") {
      const byCreatedCursor: ByCreatedCursor = {
        prevId: lastTask.id,
        prevCreatedAt: new Date(lastTask.created_at),
      };

      nextCursor = Buffer.from(JSON.stringify(byCreatedCursor)).toString(
        "base64",
      );
    } else {
      const statusCursor: ByStatusCursor = {
        prevStatus: lastTask.status,
        prevId: lastTask.id,
      };

      nextCursor = Buffer.from(JSON.stringify(statusCursor)).toString("base64");
    }
  } else {
    nextCursor = null;
  }

  return c.json(successResponse(page, { cursor: nextCursor }), 200);
});

/**
 * GET /tasks/:id
 * Retrieves a single task by its ID.
 */
tasks.get("/:id", async (c: Context) => {
  const { id } = TaskIdParamSchema.parse({
    id: c.req.param("id"),
  });
  const task = await Task.findById({ taskId: id });
  return c.json(successResponse(task), 200);
});

/**
 * POST /tasks
 * Creates a new task.
 */
tasks.post("/", async (c: Context) => {
  const body = await c.req.json();
  const { title, status, due_date, description } = CreateTaskSchema.parse(body);

  const task = await Task.save({ title, status, due_date, description });

  return c.json(successResponse({ task: { ...task } }), 201);
});

/**
 * PATCH /tasks/status/:id
 * Updates the status of an existing task.
 */
tasks.patch("/status/:id", async (c: Context) => {
  const { id } = TaskIdParamSchema.parse({ id: c.req.param("id") });
  const body = await c.req.json();
  const { status } = UpdateStatusSchema.parse(body);

  const result = await Task.updateStatus({ taskId: id, newStatus: status });

  return c.json(successResponse({ new_status: result }), 200);
});

/**
 * DELETE /tasks/:id
 * Deletes a task by its ID.
 */
tasks.delete("/:id", async (c: Context) => {
  const { id } = TaskIdParamSchema.parse({
    id: c.req.param("id"),
  });

  await Task.delete({ taskId: id });

  return c.json(successResponse(), 200);
});

export default tasks;
